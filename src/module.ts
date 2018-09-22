import browsernizr from './browsernizr';
import { createAbortError } from './factories/abort-error';
import { createAddAudioWorkletModule } from './factories/add-audio-worklet-module';
import { createAnalyserNodeConstructor } from './factories/analyser-node-constructor';
import { createAnalyserNodeRendererFactory } from './factories/analyser-node-renderer-factory';
import { createAudioBufferConstructor } from './factories/audio-buffer-constructor';
import { createAudioBufferSourceNodeConstructor } from './factories/audio-buffer-source-node-constructor';
import { createAudioBufferSourceNodeRendererFactory } from './factories/audio-buffer-source-node-renderer-factory';
import { createAudioContextConstructor } from './factories/audio-context-constructor';
import { createAudioDestinationNodeConstructor } from './factories/audio-destination-node-constructor';
import { createAudioDestinationNodeRenderer } from './factories/audio-destination-node-renderer-factory';
import { createAudioNodeConstructor } from './factories/audio-node-constructor';
import { createAudioParamFactory } from './factories/audio-param-factory';
import { createAudioParamRenderer } from './factories/audio-param-renderer';
import { createAudioWorkletNodeConstructor } from './factories/audio-worklet-node-constructor';
import { createAudioWorkletNodeRendererFactory } from './factories/audio-worklet-node-renderer-factory';
import { createBaseAudioContextConstructor } from './factories/base-audio-context-constructor';
import { createBiquadFilterNodeConstructor } from './factories/biquad-filter-node-constructor';
import { createBiquadFilterNodeRendererFactory } from './factories/biquad-filter-node-renderer-factory';
import { createChannelMergerNodeConstructor } from './factories/channel-merger-node-constructor';
import { createChannelMergerNodeRendererFactory } from './factories/channel-merger-node-renderer-factory';
import { createChannelSplitterNodeConstructor } from './factories/channel-splitter-node-constructor';
import { createChannelSplitterNodeRendererFactory } from './factories/channel-splitter-node-renderer-factory';
import { createConnectMultipleOutputs } from './factories/connect-multiple-outputs';
import { createConstantSourceNodeConstructor } from './factories/constant-source-node-constructor';
import { createConstantSourceNodeRendererFactory } from './factories/constant-source-node-renderer-factory';
import { createDisconnectMultipleOutputs } from './factories/disconnect-multiple-outputs';
import { createGainNodeConstructor } from './factories/gain-node-constructor';
import { createGainNodeRendererFactory } from './factories/gain-node-renderer-factory';
import { createGetBackupNativeContext } from './factories/get-backup-native-context';
import { createIIRFilterNodeConstructor } from './factories/iir-filter-node-constructor';
import { createIIRFilterNodeRendererFactory } from './factories/iir-filter-node-renderer-factory';
import { createIndexSizeError } from './factories/index-size-error';
import { createInvalidAccessError } from './factories/invalid-access-error';
import { createInvalidStateError } from './factories/invalid-state-error';
import { createIsNativeOfflineAudioContext } from './factories/is-native-offline-audio-context';
import { createIsSecureContext } from './factories/is-secure-context';
import { createIsSupportedPromise } from './factories/is-supported-promise';
import { createMediaElementAudioSourceNodeConstructor } from './factories/media-element-audio-source-node-constructor';
import { createMediaStreamAudioSourceNodeConstructor } from './factories/media-stream-audio-source-node-constructor';
import { createMinimalAudioContextConstructor } from './factories/minimal-audio-context-constructor';
import { createMinimalBaseAudioContextConstructor } from './factories/minimal-base-audio-context-constructor';
import { createMinimalOfflineAudioContextConstructor } from './factories/minimal-offline-audio-context-constructor';
import { createNativeAnalyserNodeFactory } from './factories/native-analyser-node-factory';
import { createNativeAudioBufferSourceNodeFactory } from './factories/native-audio-buffer-source-node-factory';
import { createNativeAudioContextConstructor } from './factories/native-audio-context-constructor';
import { createNativeAudioDestinationNode } from './factories/native-audio-destination-node';
import { createNativeAudioNodeFactory } from './factories/native-audio-node-factory';
import { createNativeAudioWorkletNodeConstructor } from './factories/native-audio-worklet-node-constructor';
import { createNativeAudioWorkletNodeFactory } from './factories/native-audio-worklet-node-factory';
import { createNativeAudioWorkletNodeFakerFactory } from './factories/native-audio-worklet-node-faker-factory';
import { createNativeBiquadFilterNodeFactory } from './factories/native-biquad-filter-node-factory';
import { createNativeChannelMergerNodeFactory } from './factories/native-channel-merger-node-factory';
import { createNativeChannelSplitterNodeFactory } from './factories/native-channel-splitter-node-factory';
import { createNativeConstantSourceNodeFactory } from './factories/native-constant-source-node-factory';
import { createNativeConstantSourceNodeFakerFactory } from './factories/native-constant-source-node-faker-factory';
import { createNativeGainNodeFactory } from './factories/native-gain-node-factory';
import { createNativeIIRFilterNodeFactory } from './factories/native-iir-filter-node-factory';
import { createNativeIIRFilterNodeFakerFactory } from './factories/native-iir-filter-node-faker-factory';
import { createNativeMediaElementAudioSourceNodeFactory } from './factories/native-media-element-audio-source-node-factory';
import { createNativeMediaStreamAudioSourceNodeFactory } from './factories/native-media-stream-audio-source-node-factory';
import { createNativeOfflineAudioContextConstructor } from './factories/native-offline-audio-context-constructor';
import { createNativeOscillatorNodeFactory } from './factories/native-oscillator-node-factory';
import { createNativeScriptProcessorNodeFactory } from './factories/native-script-processor-node-factory';
import { createNoneAudioDestinationNodeConstructor } from './factories/none-audio-destination-node-constructor';
import { createNotSupportedError } from './factories/not-supported-error';
import { createOfflineAudioContextConstructor } from './factories/offline-audio-context-constructor';
import { createOscillatorNodeConstructor } from './factories/oscillator-node-constructor';
import { createOscillatorNodeRendererFactory } from './factories/oscillator-node-renderer-factory';
import { createRenderNativeOfflineAudioContext } from './factories/render-native-offline-audio-context';
import { createStartRendering } from './factories/start-rendering';
import {
    createTestAudioBufferSourceNodeStartMethodConsecutiveCallsSupport
} from './factories/test-audio-buffer-source-node-start-method-consecutive-calls-support';
import {
    createTestAudioBufferSourceNodeStartMethodDurationParameterSupport
} from './factories/test-audio-buffer-source-node-start-method-duration-parameter-support';
import { createTestAudioContextCloseMethodSupport } from './factories/test-audio-context-close-method-support';
import {
    createTestAudioContextDecodeAudioDataMethodTypeErrorSupport
} from './factories/test-audio-context-decode-audio-data-method-type-error-support';
import { createTestAudioContextOptionsSupport } from './factories/test-audio-context-options-support';
import {
    createTestAudioScheduledSourceNodeStartMethodNegativeParametersSupport
} from './factories/test-audio-scheduled-source-node-start-method-negative-parameters-support';
import {
    createTestAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport
} from './factories/test-audio-scheduled-source-node-stop-method-consecutive-calls-support';
import {
    createTestAudioScheduledSourceNodeStopMethodNegativeParametersSupport
} from './factories/test-audio-scheduled-source-node-stop-method-negative-parameters-support';
import { createTestChannelMergerNodeSupport } from './factories/test-channel-merger-node-support';
import { createTestChannelSplitterNodeChannelCountSupport } from './factories/test-channel-splitter-node-channel-count-support';
import {
    createTestConstantSourceNodeAccurateSchedulingSupport
} from './factories/test-constant-source-node-accurate-scheduling-support';
import { createTestIsSecureContextSupport } from './factories/test-is-secure-context-support';
import { createWindow } from './factories/window';
import {
    createWrapAudioScheduledSourceNodeStopMethodConsecutiveCalls
} from './factories/wrap-audio-scheduled-source-node-stop-method-consecutive-calls';
import { createWrapChannelMergerNode } from './factories/wrap-channel-merger-node';
import { createWrapConstantSourceNodeAccurateScheduling } from './factories/wrap-constant-source-node-accurate-scheduling';
import {
    IAnalyserNode,
    IAnalyserNodeConstructor,
    IAudioBuffer,
    IAudioBufferConstructor,
    IAudioBufferSourceNode,
    IAudioBufferSourceNodeConstructor,
    IAudioContext,
    IAudioContextConstructor,
    IAudioNode,
    IAudioWorkletNode,
    IAudioWorkletNodeConstructor,
    IBiquadFilterNode,
    IBiquadFilterNodeConstructor,
    IChannelMergerNodeConstructor,
    IChannelSplitterNodeConstructor,
    IConstantSourceNode,
    IConstantSourceNodeConstructor,
    IGainNode,
    IGainNodeConstructor,
    IIIRFilterNode,
    IIIRFilterNodeConstructor,
    IMediaElementAudioSourceNode,
    IMediaElementAudioSourceNodeConstructor,
    IMediaStreamAudioSourceNode,
    IMediaStreamAudioSourceNodeConstructor,
    IMinimalAudioContext,
    IMinimalAudioContextConstructor,
    IMinimalOfflineAudioContext,
    IMinimalOfflineAudioContextConstructor,
    IOfflineAudioContext,
    IOfflineAudioContextConstructor,
    IOscillatorNode,
    IOscillatorNodeConstructor
} from './interfaces';
import { TAddAudioWorkletModuleFunction } from './types';

export * from './interfaces';
export * from './types';

const window = createWindow();
const nativeOfflineAudioContextConstructor = createNativeOfflineAudioContextConstructor(window);
const isNativeOfflineAudioContext = createIsNativeOfflineAudioContext(nativeOfflineAudioContextConstructor);
const nativeAudioContextConstructor = createNativeAudioContextConstructor(window);
const getBackupNativeContext = createGetBackupNativeContext(
    isNativeOfflineAudioContext,
    nativeAudioContextConstructor,
    nativeOfflineAudioContextConstructor
);
const createNativeAudioNode = createNativeAudioNodeFactory(getBackupNativeContext);
const createNativeAnalyserNode = createNativeAnalyserNodeFactory(createNativeAudioNode);
const createAnalyserNodeRenderer = createAnalyserNodeRendererFactory(createNativeAnalyserNode);
const audioNodeConstructor = createAudioNodeConstructor(createInvalidAccessError, isNativeOfflineAudioContext);
const noneAudioDestinationNodeConstructor = createNoneAudioDestinationNodeConstructor(audioNodeConstructor);
const analyserNodeConstructor: IAnalyserNodeConstructor = createAnalyserNodeConstructor(
    createAnalyserNodeRenderer,
    createNativeAnalyserNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);

type analyserNodeConstructor = IAnalyserNode;

export { analyserNodeConstructor as AnalyserNode };

const audioBufferConstructor: IAudioBufferConstructor = createAudioBufferConstructor(nativeOfflineAudioContextConstructor);

type audioBufferConstructor = IAudioBuffer;

export { audioBufferConstructor as AudioBuffer };

const testAudioScheduledSourceNodeStartMethodNegativeParametersSupport =
    createTestAudioScheduledSourceNodeStartMethodNegativeParametersSupport(createNativeAudioNode);
const testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport =
    createTestAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport(createNativeAudioNode);
const testAudioScheduledSourceNodeStopMethodNegativeParametersSupport =
    createTestAudioScheduledSourceNodeStopMethodNegativeParametersSupport(createNativeAudioNode);
const wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls = createWrapAudioScheduledSourceNodeStopMethodConsecutiveCalls(
    createNativeAudioNode
);
const createNativeAudioBufferSourceNode = createNativeAudioBufferSourceNodeFactory(
    createNativeAudioNode,
    createTestAudioBufferSourceNodeStartMethodConsecutiveCallsSupport(createNativeAudioNode),
    createTestAudioBufferSourceNodeStartMethodDurationParameterSupport(nativeOfflineAudioContextConstructor),
    testAudioScheduledSourceNodeStartMethodNegativeParametersSupport,
    testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport,
    testAudioScheduledSourceNodeStopMethodNegativeParametersSupport,
    wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls
);
const createAudioBufferSourceNodeRenderer = createAudioBufferSourceNodeRendererFactory(createNativeAudioBufferSourceNode);
const createAudioParam = createAudioParamFactory(createAudioParamRenderer);
const audioBufferSourceNodeConstructor: IAudioBufferSourceNodeConstructor = createAudioBufferSourceNodeConstructor(
    createAudioBufferSourceNodeRenderer,
    createAudioParam,
    createInvalidStateError,
    createNativeAudioBufferSourceNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);

type audioBufferSourceNodeConstructor = IAudioBufferSourceNode;

export { audioBufferSourceNodeConstructor as AudioBufferSourceNode };

const audioDestinationNodeConstructor = createAudioDestinationNodeConstructor(
    audioNodeConstructor,
    createAudioDestinationNodeRenderer,
    createIndexSizeError,
    createInvalidStateError,
    createNativeAudioDestinationNode,
    isNativeOfflineAudioContext
);
const createNativeBiquadFilterNode = createNativeBiquadFilterNodeFactory(createNativeAudioNode);
const createBiquadFilterNodeRenderer = createBiquadFilterNodeRendererFactory(createNativeBiquadFilterNode);
const biquadFilterNodeConstructor: IBiquadFilterNodeConstructor = createBiquadFilterNodeConstructor(
    createAudioParam,
    createBiquadFilterNodeRenderer,
    createInvalidAccessError,
    createNativeBiquadFilterNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const wrapChannelMergerNode = createWrapChannelMergerNode(createInvalidStateError, createNativeAudioNode);
const createNativeChannelMergerNode = createNativeChannelMergerNodeFactory(createNativeAudioNode, wrapChannelMergerNode);
const createChannelMergerNodeRenderer = createChannelMergerNodeRendererFactory(createNativeChannelMergerNode);
const channelMergerNodeConstructor: IChannelMergerNodeConstructor = createChannelMergerNodeConstructor(
    createChannelMergerNodeRenderer,
    createNativeChannelMergerNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const createNativeChannelSplitterNode = createNativeChannelSplitterNodeFactory(createNativeAudioNode);
const createChannelSplitterNodeRenderer = createChannelSplitterNodeRendererFactory(createNativeChannelSplitterNode);
const channelSplitterNodeConstructor: IChannelSplitterNodeConstructor = createChannelSplitterNodeConstructor(
    createChannelSplitterNodeRenderer,
    createNativeChannelSplitterNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const createNativeGainNode = createNativeGainNodeFactory(createNativeAudioNode);
const createNativeConstantSourceNodeFaker = createNativeConstantSourceNodeFakerFactory(
    createNativeAudioBufferSourceNode,
    createNativeGainNode
);
const testConstantSourceNodeAccurateSchedulingSupport = createTestConstantSourceNodeAccurateSchedulingSupport(createNativeAudioNode);
const wrapConstantSourceNodeAccurateScheduling = createWrapConstantSourceNodeAccurateScheduling(createNativeAudioNode);
const createNativeConstantSourceNode = createNativeConstantSourceNodeFactory(
    createNativeAudioNode,
    createNativeConstantSourceNodeFaker,
    testAudioScheduledSourceNodeStartMethodNegativeParametersSupport,
    testAudioScheduledSourceNodeStopMethodNegativeParametersSupport,
    testConstantSourceNodeAccurateSchedulingSupport,
    wrapConstantSourceNodeAccurateScheduling
);
const createConstantSourceNodeRenderer = createConstantSourceNodeRendererFactory(createNativeConstantSourceNode);
const constantSourceNodeConstructor: IConstantSourceNodeConstructor = createConstantSourceNodeConstructor(
    createAudioParam,
    createConstantSourceNodeRenderer,
    createNativeConstantSourceNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const createGainNodeRenderer = createGainNodeRendererFactory(createNativeGainNode);
const gainNodeConstructor: IGainNodeConstructor = createGainNodeConstructor(
    createAudioParam,
    createGainNodeRenderer,
    createNativeGainNode,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const createNativeScriptProcessorNode = createNativeScriptProcessorNodeFactory(createNativeAudioNode);
const createNativeIIRFilterNodeFaker = createNativeIIRFilterNodeFakerFactory(
    createInvalidAccessError,
    createInvalidStateError,
    createNativeScriptProcessorNode,
    createNotSupportedError
);
const renderNativeOfflineAudioContext = createRenderNativeOfflineAudioContext(createNativeGainNode);
const createIIRFilterNodeRenderer = createIIRFilterNodeRendererFactory(
    createNativeAudioBufferSourceNode,
    createNativeAudioNode,
    nativeOfflineAudioContextConstructor,
    renderNativeOfflineAudioContext
);
const createNativeIIRFilterNode = createNativeIIRFilterNodeFactory(createNativeAudioNode, createNativeIIRFilterNodeFaker);
const iIRFilterNodeConstructor: IIIRFilterNodeConstructor = createIIRFilterNodeConstructor(
    createNativeIIRFilterNode,
    createIIRFilterNodeRenderer,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const minimalBaseAudioContextConstructor = createMinimalBaseAudioContextConstructor(audioDestinationNodeConstructor);
const createNativeOscillatorNode = createNativeOscillatorNodeFactory(
    createNativeAudioNode,
    testAudioScheduledSourceNodeStartMethodNegativeParametersSupport,
    testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport,
    testAudioScheduledSourceNodeStopMethodNegativeParametersSupport,
    wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls
);
const createOscillatorNodeRenderer = createOscillatorNodeRendererFactory(createNativeOscillatorNode);
const oscillatorNodeConstructor: IOscillatorNodeConstructor = createOscillatorNodeConstructor(
    createAudioParam,
    createInvalidStateError,
    createNativeOscillatorNode,
    createOscillatorNodeRenderer,
    isNativeOfflineAudioContext,
    noneAudioDestinationNodeConstructor
);
const isSecureContext = createIsSecureContext(window);

// The addAudioWorkletModule() function is only available in a SecureContext.
export const addAudioWorkletModule: undefined | TAddAudioWorkletModuleFunction = (isSecureContext) ?
    createAddAudioWorkletModule(
        createAbortError,
        createNotSupportedError,
        getBackupNativeContext
    ) :
    undefined;

const baseAudioContextConstructor = createBaseAudioContextConstructor(
    addAudioWorkletModule,
    analyserNodeConstructor,
    audioBufferConstructor,
    audioBufferSourceNodeConstructor,
    biquadFilterNodeConstructor,
    channelMergerNodeConstructor,
    channelSplitterNodeConstructor,
    constantSourceNodeConstructor,
    gainNodeConstructor,
    iIRFilterNodeConstructor,
    minimalBaseAudioContextConstructor,
    oscillatorNodeConstructor
);
const createNativeMediaElementAudioSourceNode = createNativeMediaElementAudioSourceNodeFactory(createNativeAudioNode);
const mediaElementAudioSourceNodeConstructor: IMediaElementAudioSourceNodeConstructor = createMediaElementAudioSourceNodeConstructor(
    createNativeMediaElementAudioSourceNode,
    noneAudioDestinationNodeConstructor
);
const createNativeMediaStreamAudioSourceNode = createNativeMediaStreamAudioSourceNodeFactory(createNativeAudioNode);
const mediaStreamAudioSourceNodeConstructor: IMediaStreamAudioSourceNodeConstructor = createMediaStreamAudioSourceNodeConstructor(
    createNativeMediaStreamAudioSourceNode,
    noneAudioDestinationNodeConstructor
);
const audioContextConstructor: IAudioContextConstructor = createAudioContextConstructor(
    baseAudioContextConstructor,
    createInvalidStateError,
    mediaElementAudioSourceNodeConstructor,
    mediaStreamAudioSourceNodeConstructor,
    nativeAudioContextConstructor
);

type audioContextConstructor = IAudioContext;

export { audioContextConstructor as AudioContext };

const connectMultipleOutputs = createConnectMultipleOutputs(createIndexSizeError);
const disconnectMultipleOutputs = createDisconnectMultipleOutputs(createIndexSizeError);
const createNativeAudioWorkletNodeFaker = createNativeAudioWorkletNodeFakerFactory(
    connectMultipleOutputs,
    createIndexSizeError,
    createInvalidStateError,
    createNativeChannelMergerNode,
    createNativeChannelSplitterNode,
    createNativeConstantSourceNode,
    createNativeGainNode,
    createNativeScriptProcessorNode,
    createNotSupportedError,
    disconnectMultipleOutputs
);
const createNativeAudioWorkletNode = createNativeAudioWorkletNodeFactory(
    createInvalidStateError,
    createNativeAudioNode,
    createNativeAudioWorkletNodeFaker,
    createNotSupportedError
);
const nativeAudioWorkletNodeConstructor = createNativeAudioWorkletNodeConstructor(window);
const createAudioWorkletNodeRenderer = createAudioWorkletNodeRendererFactory(
    connectMultipleOutputs,
    createNativeAudioBufferSourceNode,
    createNativeChannelMergerNode,
    createNativeChannelSplitterNode,
    createNativeConstantSourceNode,
    createNativeGainNode,
    disconnectMultipleOutputs,
    nativeAudioWorkletNodeConstructor,
    nativeOfflineAudioContextConstructor,
    renderNativeOfflineAudioContext
);

// The AudioWorkletNode constructor is only available in a SecureContext.
const audioWorkletNodeConstructor: undefined | IAudioWorkletNodeConstructor = (isSecureContext) ?
    createAudioWorkletNodeConstructor(
        createAudioParam,
        createAudioWorkletNodeRenderer,
        createNativeAudioWorkletNode,
        isNativeOfflineAudioContext,
        nativeAudioWorkletNodeConstructor,
        noneAudioDestinationNodeConstructor
    ) :
    undefined;

type audioWorkletNodeConstructor = undefined | IAudioWorkletNode;

export { audioWorkletNodeConstructor as AudioWorkletNode };

type biquadFilterNodeConstructor = IBiquadFilterNode;

export { biquadFilterNodeConstructor as BiquadFilterNode };

type channelMergerNodeConstructor = IAudioNode;

export { channelMergerNodeConstructor as ChannelMergerNode };

type channelSplitterNodeConstructor = IAudioNode;

export { channelSplitterNodeConstructor as ChannelSplitterNode };

type constantSourceNodeConstructor = IConstantSourceNode;

export { constantSourceNodeConstructor as ConstantSourceNode };

type gainNodeConstructor = IGainNode;

export { gainNodeConstructor as GainNode };

type iIRFilterNodeConstructor = IIIRFilterNode;

export { iIRFilterNodeConstructor as IIRFilterNode };

type mediaElementAudioSourceNodeConstructor = IMediaElementAudioSourceNode;

export { mediaElementAudioSourceNodeConstructor as MediaElementAudioSourceNode };

type mediaStreamAudioSourceNodeConstructor = IMediaStreamAudioSourceNode;

export { mediaStreamAudioSourceNodeConstructor as MediaStreamAudioSourceNode };

const minimalAudioContextConstructor: IMinimalAudioContextConstructor = createMinimalAudioContextConstructor(
    createInvalidStateError,
    minimalBaseAudioContextConstructor,
    nativeAudioContextConstructor
);

type minimalAudioContextConstructor = IMinimalAudioContext;

export { minimalAudioContextConstructor as MinimalAudioContext };

const startRendering = createStartRendering(renderNativeOfflineAudioContext);
const minimalOfflineAudioContextConstructor: IMinimalOfflineAudioContextConstructor = createMinimalOfflineAudioContextConstructor(
    createInvalidStateError,
    minimalBaseAudioContextConstructor,
    nativeOfflineAudioContextConstructor,
    startRendering
);

type minimalOfflineAudioContextConstructor = IMinimalOfflineAudioContext;

export { minimalOfflineAudioContextConstructor as MinimalOfflineAudioContext };

const offlineAudioContextConstructor: IOfflineAudioContextConstructor = createOfflineAudioContextConstructor(
    baseAudioContextConstructor,
    createInvalidStateError,
    nativeOfflineAudioContextConstructor,
    startRendering
);

type offlineAudioContextConstructor = IOfflineAudioContext;

export { offlineAudioContextConstructor as OfflineAudioContext };

type oscillatorNodeConstructor = IOscillatorNode;

export { oscillatorNodeConstructor as OscillatorNode };

export { decodeAudioData } from './decode-audio-data';

export const isSupported = () => createIsSupportedPromise(
    browsernizr,
    createTestAudioContextCloseMethodSupport(nativeAudioContextConstructor),
    createTestAudioContextDecodeAudioDataMethodTypeErrorSupport(nativeOfflineAudioContextConstructor),
    createTestAudioContextOptionsSupport(nativeAudioContextConstructor),
    createTestChannelMergerNodeSupport(nativeAudioContextConstructor),
    createTestChannelSplitterNodeChannelCountSupport(nativeOfflineAudioContextConstructor),
    createTestIsSecureContextSupport(window)
);
