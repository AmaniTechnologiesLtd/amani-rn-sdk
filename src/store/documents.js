export const initialDocuments = [
  {
    id: 'ID',
    secondary_id: ['DL'],
    title: 'Upload your ID',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Front Side',
        description:
          'Take the photo in well a lit place.\nMake sure that your document fits in the area correctly.',
        confirmationTitle: 'Front Side',
        confirmationDescription: 'Make sure that your document is readable.',
      },
      {
        title: 'Back Side',
        description:
          'Take the photo in well a lit place.\nMake sure that your document fits in the area correctly.',
        confirmationTitle: 'Back Side',
        confirmationDescription: 'Make sure that your document is readable.',
      },
    ],
    attempt: 1,
    maxAttempt: 1,
    options: ['takePicture', 'async'],
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Select Document Type',
    versionDescription: 'Please select document type you are uploading.',
    versions: {
      '': [
        {
          title: 'ID Card',
          captureTopBar: 'Upload Your ID',
          confirmationTopBar: 'Check Your ID',
          aspectRatio: 0.63,
          crop: false,
          autoCrop: true,
          autoCapture: true,
          eventName: 'IDSelection_YeniTC',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Upload Your ID',
      PENDING_REVIEW: 'Your ID is pending verification',
      PROCESSING: 'Processing Your ID...',
      APPROVED: 'Your ID is Approved',
      REJECTED: `Your ID is Rejected\nPlease try again`,
      AUTOMATICALLY_REJECTED: `Your ID is Rejected\nPlease try again`,
    },
    events: {
      clickName: 'ID',
      success: 'ID_Success_Dvm',
      capture: ['ID_On', 'ID_Arka'],
    },
    successTitle: 'Your ID is uploaded successfully.',
    successDescription: '',
    errorTitle: 'An error occured while uploading your ID.',
    errorDescription: 'Please try again.',
  },
  {
    id: 'PA',
    title: 'Upload Your Pasaport',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description:
          'Take the photo in a well lit place.\nMake sure that your document fits in the area correctly.',
      },
    ],
    options: ['takePicture', 'async'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          title: 'Pasaport',
          captureTopBar: 'Upload Your Passport',
          confirmationTopBar: 'Check Your Passport',
          aspectRatio: 0.7042,
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'PASelection',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Upload Your Passport',
      PENDING_REVIEW: 'Your Passport is pending verification',
      PROCESSING: 'Processing Your Passport...',
      APPROVED: 'Your Passport is Approved',
      REJECTED: `Your Passport is Rejected\nPlease try again`,
      AUTOMATICALLY_REJECTED: `Your Passport is Rejected\nPlease try again`,
    },
    events: {
      clickName: 'PA',
      success: 'PA_Success_Dvm',
      capture: ['PA_On'],
    },
    successTitle: 'Your passport is uploaded successfully.',
    successDescription: '',
    errorTitle: 'An error occured while uploading your passport.',
    errorDescription: 'Please try again.',
  },
  {
    id: 'SE',
    title: 'Take a Selfie',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: 'Please align your face inside the specified region.',
        confirmationDescription:
          'Please make sure your face is clear and well illuminated.',
      },
    ],
    attempt: 1,
    maxAttempt: 1,
    options: ['takePicture', 'async'],
    type: 'video',
    captureVideo: true,
    cameraFacing: 'user',
    duration: 3,
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          title: 'Selfie',
          captureTopBar: 'Take a Selfie',
          confirmationTopBar: 'Check Your Selfie',
          crop: false,
          autoCrop: false,
          autoCapture: true,
          eventName: 'SelfieSelection',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Upload Your Selfie',
      PENDING_REVIEW: 'Your Selfie is pending verification',
      PROCESSING: 'Processing Your Selfie...',
      APPROVED: 'Your Selfie is Approved',
      REJECTED: 'Your Selfie is Rejected\nPlease try again',
      AUTOMATICALLY_REJECTED: 'Your Selfie is Rejected\nPlease try again',
    },
    events: {
      clickName: 'Selfie',
      success: 'Selfie_Success_Dvm',
      capture: ['Selfie'],
    },
    successTitle: 'Your Selfie is uploaded successfully.',
    successDescription: '',
    errorTitle: 'An error occured while uploading your Selfie.',
    errorDescription: 'Please try again.',
  },
  {
    id: 'UB',
    title: 'Upload Your Address Document',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: '',
      },
    ],
    attempt: 1,
    maxAttempt: 1,
    options: ['takePicture', 'fileUpload', 'async'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Select Document Type',
    versionDescription:
      'To verify your address please upload utility bill of last three months. You can upload by taking photo or using PDF.',
    versions: {
      '': [
        {
          title: 'Utility Bill',
          captureTopBar: 'Upload Your Utility Bill',
          confirmationTopBar: 'Check Your Utility Bill',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Upload Your Address Document',
      PENDING_REVIEW: 'Your Address is pending verification',
      PROCESSING: 'Processing Your Address Document...',
      APPROVED: 'Your Address Document is Approved',
      REJECTED: `Your Address Document is Rejected\nPlease try again`,
      AUTOMATICALLY_REJECTED: `Your Address Document is Rejected\nPlease try again`,
    },
    events: {
      clickName: 'Adres',
      success: 'Adres_Dvm',
      capture: ['Fatura'],
    },
    successTitle: 'Your address document is uploaded successfully.',
    successDescription: '',
    errorTitle: 'An error occured while uploading address document.',
    errorDescription: 'Please try again.',
  },
  {
    id: 'SG',
    title: 'Digital Contract',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Signature 1 / 2',
        description: '',
      },
      {
        title: 'Signature 2 / 2',
        description: '',
      },
    ],
    attempt: 1,
    maxAttempt: 1,
    options: ['takePicture', 'async'],
    type: 'image',
    captureVideo: false,
    cameraFacing: null,
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          title: 'Contract',
          confirmationTopBar: 'Approve Digital Contract',
          crop: false,
          autoCrop: false,
          autoCapture: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Sign Digital Contract',
      PENDING_REVIEW: 'Your Signature is pending verification',
      PROCESSING: 'Processing Your Signature...',
      APPROVED: 'Your Signature is Approved',
      REJECTED: 'Your Signature is Rejected\nPlease try again',
      AUTOMATICALLY_REJECTED: 'Your Signature is Rejected\nPlease try again',
    },
    events: {
      clickName: 'Dijital',
      success: 'Dijital_Dvm',
      capture: ['Dijital'],
    },
    successTitle: 'Your signature is uploaded successfully.',
    successDescription: '',
    errorTitle: 'An error occured while uploading your signature.',
    errorDescription: 'Please try again.',
  },
  {
    id: 'CO',
    title: 'Fiziksel Sözleşme Yükle',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Fiziksel Sözleşme',
        description: '',
      },
    ],
    attempt: 1,
    maxAttempt: 1,
    options: ['takePicture', 'fileUpload'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          title: 'Fiziksel Sözleşme',
          captureTopBar: 'Fiziksel Sözleşmeni Yükle',
          confirmationTopBar: 'Fiziksel Sözleşmeni Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Fiziksel Sözleşmeni Yükle',
      PENDING_REVIEW: 'Fiziksel Sözleşmen Kontrol Ediliyor...',
      PROCESSING: 'Fiziksel Sözleşmen Kontrol Ediliyor...',
      APPROVED: 'Fiziksel Sözleşme Onaylandı',
      REJECTED: 'Fiziksel Sözleşmen Onaylanmadı\nPlease try again',
      AUTOMATICALLY_REJECTED:
        'Fiziksel Sözleşmen Onaylanmadı\nPlease try again',
    },
    events: {
      clickName: 'Fiziksel',
      success: 'Fzk_Dvm',
      capture: ['Fzk'],
    },
    successTitle: 'Fiziksel sözleşmeni başarıyla yükledin.',
    successDescription:
      'Tüm adımları tamamladın.\n\nYüklediğin tüm belgeleri kontrol edip limitini en geç 48 saat içerisinde artıracağız.',
    errorTitle: 'Sözleşmeni yüklerken bir hata oluştu.',
    errorDescription: 'Please try again.',
  },
];

export const documentsReducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_DOCUMENTS':
      return state.filter((document) =>
        action.document_types.includes(document.id),
      );
    case 'CHANGE_STATUS':
      return state.map((document) => {
        if (
          action.document_id === document.id ||
          (document.secondary_id &&
            document.secondary_id.includes(action.document_id))
        ) {
          return { ...document, status: action.status };
        }
        return document;
      });
    case 'INCREMENT_ATTEMPT':
      return state.map((document) => {
        if (action.document_id === document.id) {
          return { ...document, attempt: document.attempt + 1 };
        }
        return document;
      });
    default:
      return state;
  }
};
