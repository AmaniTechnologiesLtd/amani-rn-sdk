export const initialDocuments = [
  {
    id: 'ID',
    secondary_id: 'DL',
    title: 'Kimliğini Yükle',
    status: 'NOT_UPLOADED',
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
    attempt: 1,
    maxAttempt: 2,
    options: ['takePicture', 'async'],
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Kimlik Tipini Seçin',
    versionDescription:
      'Lütfen doğrulama işlemi için kullanacağın kimliğinin tipini seç. Eğer mevcutsa, yeni tip TC Kimlik Kartını kullanman önerilir',
    versions: {
      '': [
        {
          title: 'T.C. Kimlik Kartı (Yeni Tip)',
          captureTopBar: 'Kimliğini Yükle',
          confirmationTopBar: 'Kimliğini Kontrol Et',
          aspectRatio: 0.63,
          crop: false,
          autoCrop: true,
          autoCapture: true,
          eventName: 'IDSelection_YeniTC',
        },
        {
          title: 'Nüfus Cüzdanı (Eski Tip)',
          captureTopBar: 'Kimliğini Yükle',
          confirmationTopBar: 'Kimliğini Kontrol Et',
          aspectRatio: 1.2,
          crop: false,
          autoCrop: true,
          autoCapture: true,
          eventName: 'IDSelection_EskiTC',
        },
        {
          title: 'Ehliyet (Yeni Tip)',
          captureTopBar: 'Kimliğini Yükle',
          confirmationTopBar: 'Kimliğini Kontrol Et',
          aspectRatio: 0.63,
          crop: false,
          autoCrop: true,
          autoCapture: true,
          eventName: 'IDSelection_YeniE',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Kimliğini Doğrula',
      PENDING_REVIEW: 'Kimliğin Kontrol Ediliyor...',
      PROCESSING: 'Kimliğin Kontrol Ediliyor...',
      APPROVED: 'Kimliğin Onaylandı',
      REJECTED: `Kimliğin onaylanmadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Kimliğin onaylanmadı\nLütfen tekrar dene`,
    },
    successTitle: 'Kimliğini başarıyla yükledin.',
    successDescription: '',
    errorTitle: 'Kimliğni yüklerken bir hata oluştu.',
    errorDescription: 'Lütfen tekrar dene.',
  },
  {
    id: 'SE',
    title: 'Selfie Çek',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: 'Lütfen yüzünü işaretli alana yerleştir.',
        confirmationDescription:
          'Yüzünün net ve aydınlık bir şekilde çıktığından olduğundan emin ol.',
      },
    ],
    attempt: 1,
    maxAttempt: 2,
    options: ['takePicture'],
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
          captureTopBar: 'Selfie Çek',
          confirmationTopBar: "Selfie'ni Kontrol Et",
          crop: false,
          autoCrop: false,
          autoCapture: true,
          eventName: 'SelfieSelection',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Selfie Doğrula',
      PENDING_REVIEW: 'Selfie Kontrol Ediliyor...',
      PROCESSING: 'Selfie Kontrol Ediliyor...',
      APPROVED: 'Selfie Onaylandı',
      REJECTED: `Selfie onaylanmadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Selfie onaylanmadı\nLütfen tekrar dene`,
    },
    successTitle: "Selfie'ni başarıyla yükledin.",
    successDescription: '',
    errorTitle: "Selfie'ni yüklerken bir hata oluştu.",
    errorDescription: 'Lütfen tekrar dene.',
  },
  {
    id: 'UB',
    title: 'Adresini Doğrula',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: '',
      },
    ],
    attempt: 1,
    maxAttempt: 2,
    options: ['takePicture', 'fileUpload', 'skipDocument', 'async'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Belge Tipini Seçin',
    versionDescription:
      'Adresini doğrulamak için kendi adına kesilmiş (son 3 aya ait) bir fatura ya da ikametgah belgeni yükle. İstediğin belgeyi fotoğrafını çekerek ya da dijital (pdf) olarak yükleyebilirsin.\n\nEğer yanında hiçbir belge yoksa bu adımı şimdilik atlayabilir ya da hemen e-devletten ikametgah belgeni pdf olarak indirip yükleyebilirsin.',
    versions: {
      Devlet: [
        {
          title: 'E-Devlet İkametgah Belgesi',
          captureTopBar: 'İkametgah Belgeni Yükle',
          confirmationTopBar: 'İkametgah Belgeni Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          edevlet: true,
          eventName: 'Adres_Ikm',
        },
      ],
      GSM: [
        {
          title: 'Türk Telekom',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
        {
          title: 'Turkcell',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
        {
          title: 'Vodafone',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
      ],
      Su: [
        {
          title: 'İski',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
      ],
      Doğalgaz: [
        {
          title: 'İgdaş',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
      ],
      Elektrik: [
        {
          title: 'Boğaziçi Elektrik',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
      ],
      Diğer: [
        {
          title: 'Diğer Tüm Kurumlar',
          captureTopBar: 'Faturanı Yükle',
          confirmationTopBar: 'Yüklediğin Faturayı Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          eventName: 'Adres_Ftr',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Adres Belgeni Yükle',
      PENDING_REVIEW: 'Adres Belgen Kontrol Ediliyor...',
      PROCESSING: 'Adres Belgen Kontrol Ediliyor...',
      APPROVED: 'Adres Belgen Onaylandı',
      REJECTED: `Adres Belgen Onaylanmadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Adres Belgen Onaylanmadı\nLütfen tekrar dene`,
    },
    successTitle: 'Adres belgeni başarıyla yükledin.',
    successDescription: '',
    errorTitle: 'Adres belgeni yüklerken bir hata oluştu.',
    errorDescription: 'Lütfen tekrar dene.',
  },
  {
    id: 'SG',
    title: 'Dijital Sözleşme',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'İmzanı At (1. İmza)',
        description: '',
      },
      {
        title: 'İmzanı At (2. İmza)',
        description: '',
      },
    ],
    attempt: 1,
    maxAttempt: 3,
    options: ['takePicture'],
    type: 'image',
    captureVideo: false,
    cameraFacing: null,
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          title: 'Sözleşme',
          confirmationTopBar: 'Dijital Sözleşmeyi Onayla',
          crop: false,
          autoCrop: false,
          autoCapture: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Dijital Sözleşmeni İmzala',
      PENDING_REVIEW: 'İmzan kontrol ediliyor...',
      PROCESSING: 'İmzan kontrol ediliyor...',
      APPROVED: 'Dijital Sözleşme İmzalandı',
      REJECTED: 'İmzan Onaylanmadı\nLütfen tekrar dene',
      AUTOMATICALLY_REJECTED: 'İmzan Onaylanmadı\nLütfen tekrar dene',
    },
    successTitle: 'Dijital sözleşmeni başarıyla yükledin.',
    successDescription: '',
    errorTitle: 'Sözleşmeni yüklerken bir hata oluştu.',
    errorDescription: 'Lütfen tekrar dene.',
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
    maxAttempt: 2,
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
      REJECTED: 'Fiziksel Sözleşmen Onaylanmadı\nLütfen tekrar dene',
      AUTOMATICALLY_REJECTED:
        'Fiziksel Sözleşmen Onaylanmadı\nLütfen tekrar dene',
    },
    successTitle: 'Fiziksel sözleşmeni başarıyla yükledin.',
    successDescription:
      'Tüm adımları tamamladın.\n\nYüklediğin tüm belgeleri kontrol edip limitini en geç 48 saat içerisinde artıracağız.',
    errorTitle: 'Sözleşmeni yüklerken bir hata oluştu.',
    errorDescription: 'Lütfen tekrar dene.',
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
