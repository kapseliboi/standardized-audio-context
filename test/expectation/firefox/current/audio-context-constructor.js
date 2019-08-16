describe('audioContextConstructor', () => {

    let audioContext;

    afterEach(() => audioContext.close());

    beforeEach(() => {
        audioContext = new AudioContext();
    });

    describe('createBiquadFilter()', () => {

        let biquadFilterNode;

        beforeEach(() => {
            biquadFilterNode = audioContext.createBiquadFilter();
        });

        describe('getFrequencyResponse()', () => {

            // bug #68

            it('should throw no error', () => {
                biquadFilterNode.getFrequencyResponse(new Float32Array(), new Float32Array(1), new Float32Array(1));
            });

        });

    });

    describe('createBuffer()', () => {

        // bug #157

        describe('copyFromChannel()/copyToChannel()', () => {

            let audioBuffer;

            beforeEach(() => {
                audioBuffer = audioContext.createBuffer(2, 100, 44100);
            });

            it('should not allow to copy values with a bufferOffset greater than the length of the AudioBuffer', () => {
                const source = new Float32Array(10);

                expect(() => audioBuffer.copyToChannel(source, 0, 101)).to.throw(Error);
            });

        });

    });

    describe('createMediaStreamSource()', () => {

        describe('with a mediaStream that has no audio track', () => {

            let videoStream;

            afterEach(() => {
                for (const videoStreamTrack of videoStream.getTracks()) {
                    videoStreamTrack.stop();
                }
            });

            beforeEach(() => {
                const canvasElement = document.createElement('canvas');

                // @todo https://bugzilla.mozilla.org/show_bug.cgi?id=1388974
                canvasElement.getContext('2d');

                videoStream = canvasElement.captureStream();
            });

            // bug #120

            it('should not throw an error', () => {
                audioContext.createMediaStreamSource(videoStream);
            });

        });

        describe('with an audio track that gets removed from the mediaStream after construction', () => {

            let mediaStream;
            let mediaStreamTracks;
            let oscillatorNode;

            afterEach(() => {
                for (const mediaStreamTrack of mediaStreamTracks) {
                    mediaStreamTrack.stop();
                }

                oscillatorNode.stop();
            });

            beforeEach(() => {
                const mediaStreamDestinationNode = new MediaStreamAudioDestinationNode(audioContext);

                oscillatorNode = new OscillatorNode(audioContext);

                oscillatorNode.connect(mediaStreamDestinationNode);
                oscillatorNode.start();

                mediaStream = mediaStreamDestinationNode.stream;
                mediaStreamTracks = mediaStream.getTracks();
            });

            // bug #151

            it('should not use the audio track as input anymore', (done) => {
                const channelData = new Float32Array(512);
                const mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(audioContext, { mediaStream });
                const scriptProcessorNode = audioContext.createScriptProcessor(512);

                for (const mediaStreamTrack of mediaStreamTracks) {
                    mediaStream.removeTrack(mediaStreamTrack);
                }

                scriptProcessorNode.onaudioprocess = ({ inputBuffer }) => {
                    inputBuffer.copyFromChannel(channelData, 0);

                    for (let i = 0; i < 512; i += 1) {
                        if (channelData[i] !== 0) {
                            mediaStreamAudioSourceNode.disconnect(scriptProcessorNode);

                            done(new Error('The signal is expected to be zero at all time.'));

                            break;
                        }
                    }
                };

                mediaStreamAudioSourceNode.connect(scriptProcessorNode);

                setTimeout(() => {
                    mediaStreamAudioSourceNode.disconnect(scriptProcessorNode);

                    done();
                }, 1000);
            });

        });

        describe('with a mediaStream with two audio tracks', () => {

            let constantSourceNode;
            let gainNodes;
            let mediaStream;
            let mediaStreamAudioDestinationNodes;

            afterEach(() => {
                constantSourceNode.stop();

                constantSourceNode.disconnect(gainNodes[0]);
                constantSourceNode.disconnect(gainNodes[1]);
                gainNodes[0].disconnect(mediaStreamAudioDestinationNodes[0]);
                gainNodes[1].disconnect(mediaStreamAudioDestinationNodes[1]);
            });

            beforeEach(() => {
                constantSourceNode = audioContext.createConstantSource();
                gainNodes = [
                    audioContext.createGain(),
                    audioContext.createGain()
                ];
                mediaStreamAudioDestinationNodes = [
                    audioContext.createMediaStreamDestination(),
                    audioContext.createMediaStreamDestination()
                ];

                constantSourceNode
                    .connect(gainNodes[0])
                    .connect(mediaStreamAudioDestinationNodes[0]);
                constantSourceNode
                    .connect(gainNodes[1])
                    .connect(mediaStreamAudioDestinationNodes[1]);

                constantSourceNode.start();

                const audioStreamTracks = mediaStreamAudioDestinationNodes
                    .map(({ stream }) => stream.getAudioTracks()[0]);

                if (audioStreamTracks[0].id > audioStreamTracks[1].id) {
                    mediaStream = mediaStreamAudioDestinationNodes[0].stream;

                    gainNodes[0].gain.value = 0;
                    mediaStream.addTrack(audioStreamTracks[1]);
                } else {
                    mediaStream = mediaStreamAudioDestinationNodes[1].stream;

                    gainNodes[1].gain.value = 0;
                    mediaStream.addTrack(audioStreamTracks[0]);
                }
            });

            // bug #159

            it('should pick the first track', (done) => {
                const channelData = new Float32Array(512);
                const mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(audioContext, { mediaStream });
                const scriptProcessorNode = audioContext.createScriptProcessor(512);

                scriptProcessorNode.onaudioprocess = ({ inputBuffer }) => {
                    inputBuffer.copyFromChannel(channelData, 0);

                    for (let i = 0; i < 512; i += 1) {
                        if (channelData[i] !== 0) {
                            mediaStreamAudioSourceNode.disconnect(scriptProcessorNode);

                            done(new Error('The signal is expected to be zero at all time.'));

                            break;
                        }
                    }
                };

                mediaStreamAudioSourceNode.connect(scriptProcessorNode);

                setTimeout(() => {
                    mediaStreamAudioSourceNode.disconnect(scriptProcessorNode);

                    done();
                }, 1000);
            });

        });

    });

});
