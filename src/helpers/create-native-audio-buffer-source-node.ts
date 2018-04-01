import { assignNativeAudioNodeOptions } from '../helpers/assign-native-audio-node-options';
import { cacheTestResult } from '../helpers/cache-test-result';
import { IAudioBufferSourceOptions } from '../interfaces';
import {
    testAudioBufferSourceNodeStartMethodConsecutiveCallsSupport
} from '../support-testers/audio-buffer-source-node-start-method-consecutive-calls';
import {
    testAudioScheduledSourceNodeStartMethodNegativeParametersSupport
} from '../support-testers/audio-scheduled-source-node-start-method-negative-parameters';
import {
    testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport
} from '../support-testers/audio-scheduled-source-node-stop-method-consecutive-calls';
import {
    testAudioScheduledSourceNodeStopMethodNegativeParametersSupport
} from '../support-testers/audio-scheduled-source-node-stop-method-negative-parameters';
import { TNativeAudioBufferSourceNode, TUnpatchedAudioContext, TUnpatchedOfflineAudioContext } from '../types';
import { wrapAudioBufferSourceNodeStartMethodConsecutiveCalls } from '../wrappers/audio-buffer-source-node-start-method-consecutive-calls';
import {
    wrapAudioScheduledSourceNodeStartMethodNegativeParameters
} from '../wrappers/audio-scheduled-source-node-start-method-negative-parameters';
import {
    wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls
} from '../wrappers/audio-scheduled-source-node-stop-method-consecutive-calls';
import {
    wrapAudioScheduledSourceNodeStopMethodNegativeParameters
} from '../wrappers/audio-scheduled-source-node-stop-method-negative-parameters';

export const createNativeAudioBufferSourceNode = (
    nativeContext: TUnpatchedAudioContext | TUnpatchedOfflineAudioContext,
    options: Partial<IAudioBufferSourceOptions> = { }
): TNativeAudioBufferSourceNode => {
    const nativeNode = nativeContext.createBufferSource();

    assignNativeAudioNodeOptions(nativeNode, options);

    // Bug #71: Edge does not allow to set the buffer to null.
    if (options.buffer !== undefined && options.buffer !== null) {
        nativeNode.buffer = options.buffer;
    }

    // @todo if (options.detune !== undefined) {
    // @todo    nativeNode.detune.value = options.detune;
    // @todo }

    if (options.loop !== undefined) {
        nativeNode.loop = options.loop;
    }

    if (options.loopEnd !== undefined) {
        nativeNode.loopEnd = options.loopEnd;
    }

    if (options.loopStart !== undefined) {
        nativeNode.loopStart = options.loopStart;
    }

    if (options.playbackRate !== undefined) {
        nativeNode.playbackRate.value = options.playbackRate;
    }

    // Bug #69: Safari does allow calls to start() of an already scheduled AudioBufferSourceNode.
    if (!cacheTestResult(
        testAudioBufferSourceNodeStartMethodConsecutiveCallsSupport,
        () => testAudioBufferSourceNodeStartMethodConsecutiveCallsSupport(nativeContext)
    )) {
        wrapAudioBufferSourceNodeStartMethodConsecutiveCalls(nativeNode);
    }

    // Bug #44: Only Chrome & Opera throw a RangeError yet.
    if (!cacheTestResult(
        testAudioScheduledSourceNodeStartMethodNegativeParametersSupport,
        () => testAudioScheduledSourceNodeStartMethodNegativeParametersSupport(nativeContext)
    )) {
        wrapAudioScheduledSourceNodeStartMethodNegativeParameters(nativeNode);
    }

    // Bug #19: Safari does not ignore calls to stop() of an already stopped AudioBufferSourceNode.
    if (!cacheTestResult(
        testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport,
        () => testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport(nativeContext)
    )) {
        wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls(nativeNode, nativeContext);
    }

    // Bug #44: No browser does throw a RangeError yet.
    if (!cacheTestResult(
        testAudioScheduledSourceNodeStopMethodNegativeParametersSupport,
        () => testAudioScheduledSourceNodeStopMethodNegativeParametersSupport(nativeContext)
    )) {
        wrapAudioScheduledSourceNodeStopMethodNegativeParameters(nativeNode);
    }

    return nativeNode;
};
