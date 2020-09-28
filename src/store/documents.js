export const initialDocuments = [
  {
    id: 'ID',
    secondary_id: ['DL'],
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
          nfc: true,
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
          title: 'Ehliyet',
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
      PENDING_REVIEW: 'Kimliğin Yüklendi Kontrol Ediliyor...',
      PROCESSING: 'Kimliğin Kontrol Ediliyor...',
      APPROVED: 'Kimliğin Onaylandı',
      REJECTED: `Kimliğin onaylanmadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Kimliğin onaylanmadı\nLütfen tekrar dene`,
    },
    events: {
      clickName: 'ID',
      success: 'ID_Success_Dvm',
      capture: ['ID_On', 'ID_Arka'],
    },
    successTitle: 'Kimliğini başarıyla yükledin.',
    successDescription: '',
    errorTitle: 'Kimliğni yüklerken bir hata oluştu.',
    errorDescription: 'Lütfen tekrar dene.',
  },
  {
    id: 'PA',
    title: 'Pasaportunu Yükle',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Pasaportunun fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\nPasaportunun işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol.',
        confirmationTitle: 'Pasaport',
        confirmationDescription:
          'Pasaportunun bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol.',
      },
    ],
    attempt: 1,
    maxAttempt: 2,
    options: ['takePicture', 'async'],
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Pasaport Tipini Seçin',
    versionDescription:
      'Lütfen doğrulama işlemi için kullanacağın pasaportun tipini seç',
    versions: {
      '': [
        {
          title: 'Pasaport',
          captureTopBar: 'Pasaportunu Yükle',
          confirmationTopBar: 'Pasaportunu Kontrol Et',
          aspectRatio: 0.7042,
          nfc: false,
          crop: false,
          autoCrop: true,
          autoCapture: true,
          eventName: 'PASelection',
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Pasaportunu Doğrula',
      PENDING_REVIEW: 'Pasaportun Yüklendi Kontrol Ediliyor...',
      PROCESSING: 'Pasaportun Kontrol Ediliyor...',
      APPROVED: 'Pasaportun Onaylandı',
      REJECTED: `Pasaportun onaylanmadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Pasaportun onaylanmadı\nLütfen tekrar dene`,
    },
    events: {
      clickName: 'PA',
      success: 'PA_Success_Dvm',
      capture: ['PA_On'],
    },
    successTitle: 'Pasaportunu başarıyla yükledin.',
    successDescription: '',
    errorTitle: 'Pasaportunu yüklerken bir hata oluştu.',
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
      PENDING_REVIEW: "Selfie'n Yüklendi Kontrol Ediliyor...",
      PROCESSING: "Selfie'n Kontrol Ediliyor...",
      APPROVED: "Selfie'n Onaylandı",
      REJECTED: "Selfie'n onaylanmadı\nLütfen tekrar dene",
      AUTOMATICALLY_REJECTED: "Selfie'n onaylanmadı\nLütfen tekrar dene",
    },
    events: {
      clickName: 'Selfie',
      success: 'Selfie_Success_Dvm',
      capture: ['Selfie'],
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
    options: ['takePicture', 'async', 'fileUpload', 'skipDocument'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Belge Tipini Seçin',
    versionDescription:
      'Adresini doğrulamak için kendi adına kesilmiş (son 3 aya ait) bir fatura ya da ikametgah belgeni yükle. İstediğin belgeyi fotoğrafını çekerek ya da dijital (pdf) olarak yükleyebilirsin.\n\nEğer yanında hiçbir belge yoksa bu adımı şimdilik atlayabilir ya da hemen e-devletten ikametgah belgeni pdf olarak indirip yükleyebilirsin.',
    versions: {
      'Resmi Belge': [
        {
          title: 'İkametgah Belgesi',
          captureTopBar: 'İkametgah Belgeni Yükle',
          confirmationTopBar: 'İkametgah Belgeni Kontrol Et',
          crop: true,
          autoCrop: false,
          autoCapture: false,
          edevlet: true,
          eventName: 'Adres_Ikm',
        },
      ],
      'GSM Faturası': [
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
      'Su Faturası': [
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
      'Doğalgaz Faturası': [
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
      'Elektrik Faturası': [
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
      PENDING_REVIEW: 'Adres Belgen Yüklendi Kontrol Ediliyor...',
      PROCESSING: 'Adres Belgen Kontrol Ediliyor...',
      APPROVED: 'Adres Belgen Onaylandı',
      REJECTED: `Adres Belgen Onaylanmadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Adres Belgen Onaylanmadı\nLütfen tekrar dene`,
    },
    events: {
      clickName: 'Adres',
      success: 'Adres_Dvm',
      capture: ['Fatura'],
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
        title: 'İmzanı At',
        description: '',
      },
    ],
    attempt: 1,
    maxAttempt: 2,
    options: ['takePicture', 'async'],
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
      PENDING_REVIEW: 'İmzan Yüklendi Kontrol Ediliyor...',
      PROCESSING: 'İmzan Kontrol Ediliyor...',
      APPROVED: 'Dijital Sözleşme İmzalandı',
      REJECTED: 'İmzan Onaylanmadı\nLütfen tekrar dene',
      AUTOMATICALLY_REJECTED: 'İmzan Onaylanmadı\nLütfen tekrar dene',
    },
    events: {
      clickName: 'Dijital',
      success: 'Dijital_Dvm',
      capture: ['Dijital'],
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
    options: ['takePicture', 'async', 'fileUpload'],
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
      PENDING_REVIEW: 'Fiziksel Sözleşmen Yüklendi Kontrol Ediliyor...',
      PROCESSING: 'Fiziksel Sözleşmen Kontrol Ediliyor...',
      APPROVED: 'Fiziksel Sözleşme Onaylandı',
      REJECTED: 'Fiziksel Sözleşmen Onaylanmadı\nLütfen tekrar dene',
      AUTOMATICALLY_REJECTED:
        'Fiziksel Sözleşmen Onaylanmadı\nLütfen tekrar dene',
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
