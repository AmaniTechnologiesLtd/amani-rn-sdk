export const initialDocuments = [
  {
    id: 'ID',
    steps: [
      {
        title: 'Kimliğinin ön yüzünün fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\nKimliğinin işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol.',
        confirmationTitle: 'Kimliğinin Ön Yüzü',
        confirmationDescription:
          'Kimliğinin bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol.',
      },
      {
        title: 'Kimliğinin arka yüzünün fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\n\nKimliğinin işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol.',
        confirmationTitle: 'Kimliğinin Arka Yüzü',
        confirmationDescription:
          'Kimliğinin bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol.',
      },
    ],
    title: 'Kimliğini Yükle',
    events: {
      capture: ['ID_On', 'ID_Arka'],
      success: 'ID_Success_Dvm',
      clickName: 'ID',
    },
    status: 'NOT_UPLOADED',
    attempt: 1,
    options: ['takePicture'],
    messages: {
      APPROVED: 'Kimliğin Onaylandı',
      REJECTED: 'Kimliğin onaylanmadı\nLütfen tekrar dene',
      PROCESSING: 'Kimliğin Kontrol Ediliyor...',
      NOT_UPLOADED: 'Kimliğini Doğrula',
      PENDING_REVIEW: 'Kimliğin Kontrol Ediliyor...',
      AUTOMATICALLY_REJECTED: 'Kimliğin onaylanmadı\nLütfen tekrar dene',
    },
    versions: {
      '': [
        {
          crop: false,
          title: 'T.C. Kimlik Kartı (Yeni Tip)',
          autoCrop: true,
          eventName: 'IDSelection_YeniTC',
          aspectRatio: 0.63,
          autoCapture: true,
          captureTopBar: 'Kimliğini Yükle',
          confirmationTopBar: 'Kimliğini Kontrol Et',
        },
        {
          crop: false,
          title: 'Nüfus Cüzdanı (Eski Tip)',
          autoCrop: true,
          eventName: 'IDSelection_EskiTC',
          aspectRatio: 1.2,
          autoCapture: true,
          captureTopBar: 'Kimliğini Yükle',
          confirmationTopBar: 'Kimliğini Kontrol Et',
        },
        {
          crop: false,
          title: 'Ehliyet (Yeni Tip)',
          autoCrop: true,
          eventName: 'IDSelection_YeniE',
          aspectRatio: 0.63,
          autoCapture: true,
          captureTopBar: 'Kimliğini Yükle',
          confirmationTopBar: 'Kimliğini Kontrol Et',
        },
      ],
    },
    errorTitle: 'Kimliğni yüklerken bir hata oluştu.',
    maxAttempt: 3000,
    cameraFacing: 'environment',
    captureVideo: false,
    successTitle: 'Kimliğini başarıyla yükledin.',
    versionTitle: 'Kimlik Tipini Seçin',
    errorDescription: 'Lütfen tekrar dene.',
    successDescription: '',
    versionDescription:
      'Lütfen doğrulama işlemi için kullanacağın kimliğinin tipini seç. Eğer mevcutsa, yeni tip TC Kimlik Kartını kullanman önerilir',
  },
  {
    id: 'SE',
    type: 'video',
    steps: [
      {
        title: '',
        description: 'Lütfen yüzünü işaretli alana yerleştir.',
        confirmationDescription:
          'Yüzünün net ve aydınlık bir şekilde çıktığından olduğundan emin ol.',
      },
    ],
    title: 'Selfie Çek',
    events: {
      capture: ['Selfie'],
      success: 'Selfie_Success_Dvm',
      clickName: 'Selfie',
    },
    status: 'NOT_UPLOADED',
    attempt: 1,
    options: ['takePicture'],
    duration: 3,
    messages: {
      APPROVED: "Selfie'n Onaylandı",
      REJECTED: "Selfie'n onaylanmadı\nLütfen tekrar dene",
      PROCESSING: "Selfie'n Kontrol Ediliyor...",
      NOT_UPLOADED: 'Selfie Doğrula',
      PENDING_REVIEW: "Selfie'n Kontrol Ediliyor...",
      AUTOMATICALLY_REJECTED: "Selfie'n onaylanmadı\nLütfen tekrar dene",
    },
    versions: {
      '': [
        {
          crop: false,
          title: 'Selfie',
          autoCrop: false,
          eventName: 'SelfieSelection',
          autoCapture: true,
          captureTopBar: 'Selfie Çek',
          confirmationTopBar: "Selfie'ni Kontrol Et",
        },
      ],
    },
    errorTitle: "Selfie'ni yüklerken bir hata oluştu.",
    maxAttempt: 3000,
    cameraFacing: 'user',
    captureVideo: true,
    successTitle: "Selfie'ni başarıyla yükledin.",
    versionTitle: '',
    errorDescription: 'Lütfen tekrar dene.',
    successDescription: '',
    versionDescription: '',
  },
  {
    id: 'UB',
    type: 'image',
    steps: [{ title: '', description: '' }],
    title: 'Adresini Doğrula',
    events: {
      capture: ['Fatura'],
      success: 'Adres_Dvm',
      clickName: 'Adres',
    },
    status: 'NOT_UPLOADED',
    attempt: 1,
    options: ['takePicture', 'fileUpload', 'async'],
    messages: {
      APPROVED: 'Adresin Onaylandı',
      REJECTED: 'Adresin Onaylanmadı\nLütfen tekrar dene',
      PROCESSING: 'Adresin Kontrol Ediliyor...',
      NOT_UPLOADED: 'Adresini Doğrula',
      PENDING_REVIEW: 'Adresin Kontrol Ediliyor...',
      AUTOMATICALLY_REJECTED: 'Adresin Onaylanmadı\nLütfen tekrar dene',
    },
    versions: {
      Diğer: [
        {
          crop: true,
          title: 'Diğer Tüm Kurumlar',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
      ],
      'Resmi Belge': [
        {
          crop: true,
          title: 'İkametgah Belgesi',
          edevlet: true,
          autoCrop: false,
          eventName: 'Adres_Ikm',
          autoCapture: false,
          captureTopBar: 'İkametgah Belgeni Yükle',
          confirmationTopBar: 'İkametgah Belgeni Kontrol Et',
        },
      ],
      'Su Faturası': [
        {
          crop: true,
          title: 'İski',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
      ],
      'GSM Faturası': [
        {
          crop: true,
          title: 'Türk Telekom',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
        {
          crop: true,
          title: 'Turkcell',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
        {
          crop: true,
          title: 'Vodafone',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
      ],
      'Elektrik Faturası': [
        {
          crop: true,
          title: 'Boğaziçi Elektrik',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
      ],
      'Doğalgaz Faturası': [
        {
          crop: true,
          title: 'İgdaş',
          autoCrop: false,
          eventName: 'Adres_Ftr',
          autoCapture: false,
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
        },
      ],
    },
    errorTitle: 'Adresini doğrularken bir hata oluştu.',
    maxAttempt: 3,
    cameraFacing: 'environment',
    captureVideo: false,
    successTitle: 'Adresini başarıyla doğruladın.',
    versionTitle: 'Belge Tipini Seçin',
    errorDescription: 'Lütfen tekrar dene.',
    successDescription: '',
    versionDescription:
      'Adresini doğrulamak için kendi adına kesilmiş (son 3 aya ait) bir fatura ya da ikametgah belgeni yükle. İstediğin belgeyi fotoğrafını çekerek ya da dijital (pdf) olarak yükleyebilirsin.\n\nEğer yanında hiÇbir belge yoksa bu adımı şimdilik atlayabilir ya da hemen e-devletten ikametgah belgeni pdf olarak indirip yükleyebilirsin.',
  },
  {
    id: 'SG',
    type: 'image',
    steps: [
      { title: 'İmzanı At (1. İmza)', description: '' },
      { title: 'İmzanı At (2. İmza)', description: '' },
    ],
    title: 'Dijital Sözleşme',
    events: {
      capture: ['Dijital'],
      success: 'Dijital_Dvm',
      clickName: 'Dijital',
    },
    status: 'NOT_UPLOADED',
    attempt: 1,
    options: ['takePicture'],
    messages: {
      APPROVED: 'Dijital Sözleşme İmzalandı',
      REJECTED: 'İmzan Onaylanmadı\nLütfen tekrar dene',
      PROCESSING: 'İmzan Kontrol Ediliyor...',
      NOT_UPLOADED: 'Dijital Sözleşmeni İmzala',
      PENDING_REVIEW: 'İmzan Kontrol Ediliyor...',
      AUTOMATICALLY_REJECTED: 'İmzan Onaylanmadı\nLütfen tekrar dene',
    },
    versions: {
      '': [
        {
          crop: false,
          title: 'Sözleşme',
          autoCrop: false,
          autoCapture: false,
          confirmationTopBar: 'Dijital Sözleşmeyi Onayla',
        },
      ],
    },
    errorTitle: 'Sözleşmeni yüklerken bir hata oluştu.',
    maxAttempt: 3,
    cameraFacing: null,
    captureVideo: false,
    successTitle: 'Dijital sözleşmeni başarıyla yükledin.',
    versionTitle: '',
    errorDescription: 'Lütfen tekrar dene.',
    successDescription: '',
    versionDescription: '',
  },
  {
    id: 'CO',
    type: 'image',
    steps: [{ title: 'Fiziksel Sözleşme', description: '' }],
    title: 'Fiziksel Sözleşme Yükle',
    events: {
      capture: ['Fzk'],
      success: 'Fzk_Dvm',
      clickName: 'Fiziksel',
    },
    status: 'NOT_UPLOADED',
    attempt: 1,
    options: ['takePicture', 'fileUpload'],
    messages: {
      APPROVED: 'Fiziksel Sözleşme Onaylandı',
      REJECTED: 'Fiziksel Sözleşmen Onaylanmadı\nLütfen tekrar dene',
      PROCESSING: 'Fiziksel Sözleşmen Kontrol Ediliyor...',
      NOT_UPLOADED: 'Fiziksel Sözleşmeni Yükle',
      PENDING_REVIEW: 'Fiziksel Sözleşmen Kontrol Ediliyor...',
      AUTOMATICALLY_REJECTED:
        'Fiziksel Sözleşmen Onaylanmadı\nLütfen tekrar dene',
    },
    versions: {
      '': [
        {
          crop: true,
          title: 'Fiziksel Sözleşme',
          autoCrop: false,
          autoCapture: false,
          captureTopBar: 'Fiziksel Sözleşmeni Yükle',
          confirmationTopBar: 'Fiziksel Sözleşmeni Kontrol Et',
        },
      ],
    },
    errorTitle: 'Sözleşmeni yüklerken bir hata oluştu.',
    maxAttempt: 3,
    cameraFacing: 'environment',
    captureVideo: false,
    successTitle: 'Fiziksel sözleşmeni başarıyla yükledin.',
    versionTitle: '',
    errorDescription: 'Lütfen tekrar dene.',
    successDescription:
      'Tüm adımları tamamladın.\n\nYüklediğin tüm belgeleri kontrol edip limitini en geç 2 iş günü içerisinde artıracağız.',
    versionDescription: '',
  },
];

export const documentsReducer = (state, action) => {
  switch (action.type) {
    case 'IMPORT_DOCUMENTS':
      return action.documents;
    case 'FILTER_DOCUMENTS':
      return state.filter((document) =>
        action.document_types.includes(document.id),
      );
    case 'CHANGE_STATUS':
      return state.map((document) => {
        if (action.document_id === document.id) {
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
