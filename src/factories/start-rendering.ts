import { cacheTestResult } from '../helpers/cache-test-result';
import { getAudioNodeRenderer } from '../helpers/get-audio-node-renderer';
import { TNativeAudioBuffer, TStartRenderingFactory } from '../types';
import { wrapAudioBufferCopyChannelMethods } from '../wrappers/audio-buffer-copy-channel-methods';
import { wrapAudioBufferCopyChannelMethodsSubarray } from '../wrappers/audio-buffer-copy-channel-methods-subarray';

export const createStartRendering: TStartRenderingFactory = (
    renderNativeOfflineAudioContext,
    testAudioBufferCopyChannelMethodsSubarraySupport
) => {
    const isSupportingCopyChannelMethodsSubarray = (nativeAudioBuffer: TNativeAudioBuffer) => cacheTestResult(
        testAudioBufferCopyChannelMethodsSubarraySupport,
        () => testAudioBufferCopyChannelMethodsSubarraySupport(nativeAudioBuffer)
    );

    return (destination, nativeOfflineAudioContext) => getAudioNodeRenderer(destination)
        .render(destination, nativeOfflineAudioContext)
        .then(() => renderNativeOfflineAudioContext(nativeOfflineAudioContext))
        .then((audioBuffer) => {
            // Bug #5: Safari does not support copyFromChannel() and copyToChannel().
            if (typeof audioBuffer.copyFromChannel !== 'function') {
                wrapAudioBufferCopyChannelMethods(audioBuffer);
            // Bug #42: Firefox does not yet fully support copyFromChannel() and copyToChannel().
            } else if (!isSupportingCopyChannelMethodsSubarray(audioBuffer)) {
                wrapAudioBufferCopyChannelMethodsSubarray(audioBuffer);
            }

            return audioBuffer;
        });
};
