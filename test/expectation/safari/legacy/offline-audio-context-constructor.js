import { spy, stub } from 'sinon';
import { loadFixtureAsArrayBuffer } from '../../../helper/load-fixture';

describe('offlineAudioContextConstructor', () => {
    let offlineAudioContext;

    beforeEach(() => {
        offlineAudioContext = new webkitOfflineAudioContext(1, 25600, 44100); // eslint-disable-line new-cap, no-undef
    });

    it('should not provide an unprefixed constructor', () => {
        expect(window.OfflineAudioContext).to.be.undefined;
    });

    describe('constructor()', () => {
        describe('with a sampleRate of 8000 Hz', () => {
            // bug #141

            it('should throw an error', () => {
                expect(() => {
                    new webkitOfflineAudioContext(1, 1, 8000); // eslint-disable-line new-cap, no-undef
                }).to.throw(DOMException);
            });
        });

        describe('with 32 as the value for numberOfChannels', () => {
            // bug #142

            it('should throw an error', () => {
                expect(() => {
                    new webkitOfflineAudioContext(32, 1, 44100); // eslint-disable-line new-cap, no-undef
                }).to.throw(DOMException);
            });
        });

        describe('with OfflineAudioContextOptions', () => {
            // bug #46

            it('should throw a TypeError', () => {
                expect(() => {
                    new webkitOfflineAudioContext({ length: 1, numberOfChannels: 1, sampleRate: 44100 }); // eslint-disable-line new-cap, no-undef
                }).to.throw(TypeError);
            });
        });
    });

    describe('audioWorklet', () => {
        // bug #59

        it('should not be implemented', () => {
            expect(offlineAudioContext.audioWorklet).to.be.undefined;
        });
    });

    describe('destination', () => {
        // bug #132

        it('should have a wrong channelCount property', () => {
            expect(offlineAudioContext.destination.channelCount).to.equal(2);
        });

        // bug #83

        it('should have a channelCountMode of max', () => {
            expect(offlineAudioContext.destination.channelCountMode).to.equal('max');
        });

        // bug #47

        it('should not have a maxChannelCount property', () => {
            expect(offlineAudioContext.destination.maxChannelCount).to.equal(0);
        });
    });

    describe('length', () => {
        // bug #17

        it('should not expose its length', () => {
            expect(offlineAudioContext.length).to.be.undefined;
        });
    });

    describe('oncomplete', () => {
        // bug #48

        it('should not fire without any connected node', (done) => {
            offlineAudioContext.oncomplete = spy();

            offlineAudioContext.startRendering();

            // Wait a second to be sure oncomplete was not called.
            setTimeout(() => {
                expect(offlineAudioContext.oncomplete).to.have.not.been.called;

                done();
            }, 1000);
        });
    });

    describe('onstatechange', () => {
        // bug #49

        it('should transition directly from suspended to closed', (done) => {
            // eslint-disable-next-line unicorn/consistent-function-scoping
            const runTest = (evaluateTest) => {
                offlineAudioContext = new webkitOfflineAudioContext(1, 1, 44100); // eslint-disable-line new-cap, no-undef

                let previousState = offlineAudioContext.state;

                offlineAudioContext.onstatechange = () => {
                    const currentState = offlineAudioContext.state;

                    if (currentState === 'closed') {
                        offlineAudioContext.onstatechange = null;

                        evaluateTest(previousState === 'suspended');
                    }

                    previousState = currentState;
                };

                // Bug #48: Connect a GainNode to make sure the rendering succeeds.
                offlineAudioContext.createGain().connect(offlineAudioContext.destination);

                offlineAudioContext.startRendering();
            };
            const evaluateTest = (hasTransitionedDirectlyFromSuspendedToClosed) => {
                if (hasTransitionedDirectlyFromSuspendedToClosed) {
                    done();
                } else {
                    runTest(evaluateTest);
                }
            };

            runTest(evaluateTest);
        });
    });

    describe('close()', () => {
        // bug #94

        it('should expose a close method', () => {
            expect(offlineAudioContext.close).to.be.a('function');
        });
    });

    describe('createBiquadFilter()', () => {
        let biquadFilterNode;

        beforeEach(() => {
            biquadFilterNode = offlineAudioContext.createBiquadFilter();
        });

        describe('detune', () => {
            describe('automationRate', () => {
                // bug #84

                it('should not be implemented', () => {
                    expect(biquadFilterNode.detune.automationRate).to.be.undefined;
                });
            });
        });

        describe('getFrequencyResponse()', () => {
            // bug #22

            it('should fill the magResponse and phaseResponse arrays with the deprecated algorithm', () => {
                const magResponse = new Float32Array(5);
                const phaseResponse = new Float32Array(5);

                biquadFilterNode.getFrequencyResponse(new Float32Array([200, 400, 800, 1600, 3200]), magResponse, phaseResponse);

                expect(Array.from(magResponse)).to.deep.equal([
                    1.1107852458953857, 0.8106917142868042, 0.20565471053123474, 0.04845593497157097, 0.011615658178925514
                ]);
                expect(Array.from(phaseResponse)).to.deep.equal([
                    -0.7254799008369446, -1.8217267990112305, -2.6273605823516846, -2.906902313232422, -3.0283825397491455
                ]);
            });

            // bug #68

            it('should throw no error', () => {
                biquadFilterNode.getFrequencyResponse(new Float32Array(), new Float32Array(1), new Float32Array(1));
            });
        });
    });

    describe('createBufferSource()', () => {
        describe('buffer', () => {
            // bug #72

            it('should allow to assign the buffer multiple times', () => {
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBufferSourceNode.buffer = offlineAudioContext.createBuffer(2, 100, 44100);
                audioBufferSourceNode.buffer = offlineAudioContext.createBuffer(2, 100, 44100);
            });

            // bug #95

            it('should not play a buffer with only one sample', (done) => {
                const audioBuffer = offlineAudioContext.createBuffer(1, 1, 44100);
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBuffer.getChannelData(0)[0] = 1;

                audioBufferSourceNode.buffer = audioBuffer;

                audioBufferSourceNode.connect(offlineAudioContext.destination);
                audioBufferSourceNode.start();

                offlineAudioContext.oncomplete = (event) => {
                    const channelData = event.renderedBuffer.getChannelData(0);

                    expect(channelData[0]).to.equal(0);

                    audioBufferSourceNode.disconnect(offlineAudioContext.destination);

                    done();
                };
                offlineAudioContext.startRendering();
            });
        });

        describe('playbackRate', () => {
            // bug #147

            it('should not respect a connected signal', (done) => {
                const audioBuffer = offlineAudioContext.createBuffer(1, 3, 44100);
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();
                const playbackRateAudioBuffer = offlineAudioContext.createBuffer(1, 3, 44100);
                const playbackRateAudioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBuffer.getChannelData(0)[0] = 1;
                audioBuffer.getChannelData(0)[1] = 0;
                audioBuffer.getChannelData(0)[2] = -1;

                playbackRateAudioBuffer.getChannelData(0)[0] = 2;
                playbackRateAudioBuffer.getChannelData(0)[1] = 2;
                playbackRateAudioBuffer.getChannelData(0)[2] = 2;

                audioBufferSourceNode.buffer = audioBuffer;
                playbackRateAudioBufferSourceNode.buffer = playbackRateAudioBuffer;

                audioBufferSourceNode.connect(offlineAudioContext.destination);
                playbackRateAudioBufferSourceNode.connect(audioBufferSourceNode.playbackRate);

                audioBufferSourceNode.start(0);
                playbackRateAudioBufferSourceNode.start(0);

                offlineAudioContext.oncomplete = ({ renderedBuffer }) => {
                    // Bug #5: Safari does not support copyFromChannel().
                    const channelData = renderedBuffer.getChannelData(0);

                    expect(channelData[0]).to.equal(1);
                    expect(channelData[1]).to.equal(0);
                    expect(channelData[2]).to.equal(-1);

                    done();
                };
                offlineAudioContext.startRendering();
            });
        });

        describe('start()', () => {
            // bug #44

            it('should throw a DOMException', () => {
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                expect(() => audioBufferSourceNode.start(-1))
                    .to.throw(DOMException)
                    .with.property('name', 'InvalidStateError');
                expect(() => audioBufferSourceNode.start(0, -1))
                    .to.throw(DOMException)
                    .with.property('name', 'InvalidStateError');
                expect(() => audioBufferSourceNode.start(0, 0, -1))
                    .to.throw(DOMException)
                    .with.property('name', 'InvalidStateError');
            });

            // bug #155

            it('should ignore an offset which equals the duration', (done) => {
                const audioBuffer = offlineAudioContext.createBuffer(1, 3, 44100);
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBuffer.getChannelData(0)[0] = 1;
                audioBuffer.getChannelData(0)[1] = 1;
                audioBuffer.getChannelData(0)[2] = 1;

                audioBufferSourceNode.buffer = audioBuffer;

                audioBufferSourceNode.connect(offlineAudioContext.destination);

                audioBufferSourceNode.start(0, audioBuffer.duration);

                offlineAudioContext.oncomplete = ({ renderedBuffer }) => {
                    // Bug #5: Safari does not support copyFromChannel().
                    const channelData = renderedBuffer.getChannelData(0);

                    expect(channelData[0]).to.equal(1);
                    expect(channelData[1]).to.equal(1);
                    expect(channelData[2]).to.equal(1);

                    expect(channelData[3]).to.equal(0);
                    expect(channelData[4]).to.equal(0);
                    expect(channelData[5]).to.equal(0);

                    done();
                };
                offlineAudioContext.startRendering();
            });
        });

        describe('stop()', () => {
            // bug #18

            it('should not allow calls to stop() of an AudioBufferSourceNode scheduled for stopping', () => {
                const audioBuffer = offlineAudioContext.createBuffer(1, 100, 44100);
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBufferSourceNode.buffer = audioBuffer;
                audioBufferSourceNode.connect(offlineAudioContext.destination);
                audioBufferSourceNode.start();
                audioBufferSourceNode.stop(1);
                expect(() => {
                    audioBufferSourceNode.stop();
                }).to.throw(Error);
            });

            // bug #19

            it('should not ignore calls to stop() of an already stopped AudioBufferSourceNode', (done) => {
                const audioBuffer = offlineAudioContext.createBuffer(1, 100, 44100);
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBufferSourceNode.onended = () => {
                    expect(() => {
                        audioBufferSourceNode.stop();
                    }).to.throw(Error);

                    done();
                };

                audioBufferSourceNode.buffer = audioBuffer;
                audioBufferSourceNode.connect(offlineAudioContext.destination);
                audioBufferSourceNode.start();
                audioBufferSourceNode.stop();

                offlineAudioContext.startRendering();
            });

            // bug #69

            it('should not ignore calls repeated calls to start()', () => {
                const audioBufferSourceNode = offlineAudioContext.createBufferSource();

                audioBufferSourceNode.start();
                audioBufferSourceNode.start();
            });
        });
    });

    describe('createChannelMerger()', () => {
        // bug #15

        it('should have a wrong channelCount', () => {
            const channelMergerNode = offlineAudioContext.createChannelMerger();

            expect(channelMergerNode.channelCount).to.not.equal(1);
        });

        it('should have a wrong channelCountMode', () => {
            const channelMergerNode = offlineAudioContext.createChannelMerger();

            expect(channelMergerNode.channelCountMode).to.not.equal('explicit');
        });

        // bug #16

        it('should allow to set the channelCountMode', () => {
            const channelMergerNode = offlineAudioContext.createChannelMerger();

            channelMergerNode.channelCountMode = 'clamped-max';
        });

        // bug #20

        it('should not handle unconnected channels as silence', (done) => {
            const sampleRate = offlineAudioContext.sampleRate;
            // Bug #95: Safari does not play/loop one sample buffers.
            const audioBuffer = offlineAudioContext.createBuffer(1, 2, sampleRate);
            const audioBufferSourceNode = offlineAudioContext.createBufferSource();
            const channelMergerNode = offlineAudioContext.createChannelMerger(2);

            // Bug #5: Safari does not support copyFromChannel().
            audioBuffer.getChannelData(0)[0] = 1;
            audioBuffer.getChannelData(0)[1] = 1;

            audioBufferSourceNode.buffer = audioBuffer;

            channelMergerNode.channelCountMode = 'explicit';

            audioBufferSourceNode.connect(channelMergerNode, 0, 0).connect(offlineAudioContext.destination);

            audioBufferSourceNode.start(0);

            offlineAudioContext.oncomplete = ({ renderedBuffer }) => {
                // Bug #5: Safari does not support copyFromChannel().
                const channelData = renderedBuffer.getChannelData(0);

                expect(channelData[0]).to.equal(1);

                done();
            };
            offlineAudioContext.startRendering();
        });
    });

    describe('createChannelSplitter()', () => {
        // bug #96

        it('should have a wrong channelCount', () => {
            const channelSplitterNode = offlineAudioContext.createChannelSplitter(6);

            expect(channelSplitterNode.channelCount).to.equal(2);
        });

        // bug #97

        it('should allow to set the channelCount', () => {
            const channelSplitterNode = offlineAudioContext.createChannelSplitter();

            channelSplitterNode.channelCount = 6;
            channelSplitterNode.channelCount = 2;
        });

        // bug #29

        it('should have a channelCountMode of max', () => {
            const channelSplitterNode = offlineAudioContext.createChannelSplitter();

            expect(channelSplitterNode.channelCountMode).to.equal('max');
        });

        // bug #30

        it('should allow to set the channelCountMode', () => {
            const channelSplitterNode = offlineAudioContext.createChannelSplitter();

            channelSplitterNode.channelCountMode = 'explicit';
            channelSplitterNode.channelCountMode = 'max';
        });

        // bug #31

        it('should have a channelInterpretation of speakers', () => {
            const channelSplitterNode = offlineAudioContext.createChannelSplitter();

            expect(channelSplitterNode.channelInterpretation).to.equal('speakers');
        });

        // bug #32

        it('should allow to set the channelInterpretation', () => {
            const channelSplitterNode = offlineAudioContext.createChannelSplitter();

            channelSplitterNode.channelInterpretation = 'discrete';
            channelSplitterNode.channelInterpretation = 'speakers';
        });
    });

    describe('createConstantSource()', () => {
        // bug #62

        it('should not be implemented', () => {
            expect(offlineAudioContext.createConstantSource).to.be.undefined;
        });
    });

    describe('createDynamicsCompressor()', () => {
        // bug #112

        it('should not have a tail-time', (done) => {
            const audioBuffer = offlineAudioContext.createBuffer(1, 3, 44100);
            const audioBufferSourceNode = offlineAudioContext.createBufferSource();
            const dynamicsCompressorNode = offlineAudioContext.createDynamicsCompressor();

            audioBuffer.getChannelData(0)[0] = 1;
            audioBuffer.getChannelData(0)[1] = 1;
            audioBuffer.getChannelData(0)[2] = 1;

            audioBufferSourceNode.buffer = audioBuffer;

            audioBufferSourceNode.connect(dynamicsCompressorNode).connect(offlineAudioContext.destination);

            audioBufferSourceNode.start(0);

            offlineAudioContext.oncomplete = ({ renderedBuffer }) => {
                // Bug #5: Safari does not support copyFromChannel().
                const channelData = renderedBuffer.getChannelData(0);

                for (const sample of channelData) {
                    expect(sample).to.equal(0);
                }

                done();
            };
            offlineAudioContext.startRendering();
        });
    });

    describe('createGain()', () => {
        // bug #12

        it('should not allow to disconnect a specific destination', (done) => {
            const candidate = offlineAudioContext.createGain();
            const dummy = offlineAudioContext.createGain();
            // Bug #95: Safari does not play/loop one sample buffers.
            const ones = offlineAudioContext.createBuffer(1, 2, 44100);

            ones.getChannelData(0)[0] = 1;
            ones.getChannelData(0)[1] = 1;

            const source = offlineAudioContext.createBufferSource();

            source.buffer = ones;

            source.connect(candidate).connect(offlineAudioContext.destination);

            candidate.connect(dummy);
            candidate.disconnect(dummy);

            source.start();

            offlineAudioContext.oncomplete = (event) => {
                const channelData = event.renderedBuffer.getChannelData(0);

                expect(channelData[0]).to.equal(0);

                source.disconnect(candidate);
                candidate.disconnect(offlineAudioContext.destination);

                done();
            };
            offlineAudioContext.startRendering();
        });

        describe('gain', () => {
            describe('value', () => {
                // bug #98

                it('should ignore the value setter while an automation is running', function (done) {
                    this.timeout(10000);

                    const audioBuffer = offlineAudioContext.createBuffer(
                        1,
                        0.5 * offlineAudioContext.sampleRate,
                        offlineAudioContext.sampleRate
                    );
                    const audioBufferSourceNode = offlineAudioContext.createBufferSource();
                    const gainNode = offlineAudioContext.createGain();

                    // Bug #5: Safari does not support copyToChannel().
                    for (let i = 0; i < 0.5 * offlineAudioContext.sampleRate; i += 1) {
                        audioBuffer.getChannelData(0)[i] = 1;
                    }

                    audioBufferSourceNode.buffer = audioBuffer;

                    gainNode.gain.setValueAtTime(-1, 0);
                    gainNode.gain.linearRampToValueAtTime(1, 0.5);

                    gainNode.gain.value = 100;

                    audioBufferSourceNode.connect(gainNode).connect(offlineAudioContext.destination);

                    audioBufferSourceNode.start();

                    offlineAudioContext.oncomplete = ({ renderedBuffer }) => {
                        // Bug #5: Safari does not support copyFromChannel().
                        const channelData = renderedBuffer.getChannelData(0);

                        for (const sample of channelData) {
                            expect(sample).to.be.at.least(-1);
                            expect(sample).to.be.at.most(1);
                        }

                        done();
                    };
                    offlineAudioContext.startRendering();
                });
            });

            describe('cancelAndHoldAtTime()', () => {
                let gainNode;

                beforeEach(() => {
                    gainNode = offlineAudioContext.createGain();
                });

                // bug #28

                it('should not be implemented', () => {
                    expect(gainNode.gain.cancelAndHoldAtTime).to.be.undefined;
                });
            });

            describe('setValueCurveAtTime()', () => {
                // bug #152

                it('should interpolate the values incorrectly', (done) => {
                    const audioBuffer = offlineAudioContext.createBuffer(1, 3, 44100);
                    const audioBufferSourceNode = offlineAudioContext.createBufferSource();
                    const gainNode = offlineAudioContext.createGain();

                    // Bug #5: Safari does not support copyFromChannel().
                    audioBuffer.getChannelData(0).fill(1);

                    audioBufferSourceNode.buffer = audioBuffer;

                    // Bug #183: Safari requires the curve to be a Float32Array.
                    gainNode.gain.setValueCurveAtTime(new Float32Array([1, 3]), 0, 2 / offlineAudioContext.sampleRate);

                    audioBufferSourceNode.connect(gainNode).connect(offlineAudioContext.destination);

                    audioBufferSourceNode.start(0);

                    offlineAudioContext.oncomplete = (event) => {
                        // Bug #5: Safari does not support copyFromChannel().
                        const channelData = event.renderedBuffer.getChannelData(0);

                        expect(Array.from(channelData).slice(0, 3)).to.deep.equal([1, 3, 3]);

                        done();
                    };
                    offlineAudioContext.startRendering();
                });
            });
        });
    });

    describe('createIIRFilter()', () => {
        // bug #9

        it('should not be implemented', () => {
            expect(offlineAudioContext.createIIRFilter).to.be.undefined;
        });
    });

    describe('createMediaElementSource()', () => {
        // bug #171

        it('should not throw an error', () => {
            offlineAudioContext.createMediaElementSource(new Audio());
        });
    });

    describe('createMediaStreamDestination()', () => {
        // bug #173

        it('should not throw an error', () => {
            offlineAudioContext.createMediaStreamDestination();
        });
    });

    describe('createMediaStreamSource()', () => {
        let audioContext;

        afterEach(() => audioContext.close());

        beforeEach(() => (audioContext = new webkitAudioContext())); // eslint-disable-line new-cap, no-undef

        // bug #172

        it('should not throw an error', () => {
            const mediaStreamAudioDestinationNode = audioContext.createMediaStreamDestination();

            offlineAudioContext.createMediaStreamSource(mediaStreamAudioDestinationNode.stream);
        });
    });

    describe('createScriptProcessor()', () => {
        // bug #8

        it('should not fire onaudioprocess for every buffer', (done) => {
            const scriptProcessorNode = offlineAudioContext.createScriptProcessor(256, 1, 1);

            scriptProcessorNode.connect(offlineAudioContext.destination);
            scriptProcessorNode.onaudioprocess = stub();

            offlineAudioContext.oncomplete = () => {
                expect(scriptProcessorNode.onaudioprocess.callCount).to.be.below(100);

                done();
            };
            offlineAudioContext.startRendering();
        });

        // bug #13

        it('should not have any output', (done) => {
            const scriptProcessorNode = offlineAudioContext.createScriptProcessor(256, 1, 1);

            scriptProcessorNode.connect(offlineAudioContext.destination);

            let numberOfInvocations = 0;

            scriptProcessorNode.onaudioprocess = (event) => {
                numberOfInvocations += 1;

                // Bug #5: Safari does not support copyFromChannel().
                const channelData = event.outputBuffer.getChannelData(0);

                channelData.fill(1);
            };

            offlineAudioContext.oncomplete = (event) => {
                // Bug #5: Safari does not support copyFromChannel().
                const channelData = event.renderedBuffer.getChannelData(0);

                expect(Array.from(channelData)).to.not.contain(1);

                expect(numberOfInvocations).to.be.above(0);

                done();
            };
            offlineAudioContext.startRendering();
        });
    });

    describe('createWaveShaper()', () => {
        // bug #119

        it('should map the values incorrectly', (done) => {
            const audioBuffer = offlineAudioContext.createBuffer(1, 5, offlineAudioContext.sampleRate);
            const audioBufferSourceNode = offlineAudioContext.createBufferSource();
            const waveShaperNode = offlineAudioContext.createWaveShaper();

            audioBufferSourceNode.buffer = audioBuffer;

            waveShaperNode.curve = new Float32Array([1, 0.5, 0]);

            audioBufferSourceNode.connect(waveShaperNode).connect(offlineAudioContext.destination);

            audioBufferSourceNode.start(0);

            offlineAudioContext.oncomplete = ({ renderedBuffer }) => {
                expect(renderedBuffer.getChannelData(0)[0]).to.equal(0.25);

                done();
            };
            offlineAudioContext.startRendering();
        });
    });

    describe('decodeAudioData()', () => {
        // bug #1

        it('should require the success callback function as a parameter', async function () {
            this.timeout(10000);

            const arrayBuffer = await loadFixtureAsArrayBuffer('1000-frames-of-noise-stereo.wav');

            expect(() => {
                offlineAudioContext.decodeAudioData(arrayBuffer);
            }).to.throw(TypeError, 'Not enough arguments');
        });

        // bug #5

        it('should return an AudioBuffer without copyFromChannel() and copyToChannel() methods', function (done) {
            this.timeout(10000);

            loadFixtureAsArrayBuffer('1000-frames-of-noise-stereo.wav').then((arrayBuffer) => {
                offlineAudioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                    expect(audioBuffer.copyFromChannel).to.be.undefined;
                    expect(audioBuffer.copyToChannel).to.be.undefined;

                    done();
                });
            });
        });

        // bug #21

        it('should not return a promise', async function () {
            this.timeout(10000);

            const arrayBuffer = await loadFixtureAsArrayBuffer('1000-frames-of-noise-stereo.wav');

            expect(offlineAudioContext.decodeAudioData(arrayBuffer, () => {})).to.be.undefined;
        });

        // bug #26

        it('should throw a synchronous error', (done) => {
            try {
                offlineAudioContext.decodeAudioData(null, () => {});
            } catch (err) {
                done();
            }
        });
    });

    describe('startRendering()', () => {
        // bug #21

        it('should not return a promise', () => {
            expect(offlineAudioContext.startRendering()).to.be.undefined;
        });
    });

    describe('suspend()', () => {
        it('should throw an InvalidStateError', (done) => {
            offlineAudioContext.suspend(0.01).catch((err) => {
                expect(err.code).to.equal(11);
                expect(err.name).to.equal('InvalidStateError');

                done();
            });
        });
    });
});
