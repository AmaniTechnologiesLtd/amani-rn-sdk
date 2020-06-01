export const initialDocuments = [
  {
    id: 'ID',
    secondary_id: 'DL',
    title: 'Kimliğini Doğrula',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Kimliğinin ön yüzünün fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\nKimliğinin işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol',
        confirmationTitle: 'Kimliğinin Ön Yüzü',
        confirmationDescription:
          'Kimliğinin bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol',
      },
      {
        title: 'Kimliğinin arka yüzünün fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\n\nKimliğinin işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol',
        confirmationTitle: 'Kimliğinin Arka Yüzü',
        confirmationDescription:
          'Kimliğinin bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol',
      },
    ],
    trial: 1,
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
          aspectRatio: 0.63,
          crop: false,
          autoCrop: true,
          autoCapture: true,
        },
        {
          title: 'Nüfus Cüzdanı (Eski Tip)',
          aspectRatio: 1.2,
          crop: false,
          autoCrop: true,
          autoCapture: true,
        },
        {
          title: 'Ehliyet (Yeni Tip)',
          aspectRatio: 0.63,
          crop: false,
          autoCrop: true,
          autoCapture: true,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Kimliğini Doğrula',
      PENDING_REVIEW: 'Kimliğin Yüklendi',
      PROCESSING: 'Kimliğin Doğrulanıyor',
      APPROVED: 'Kimliğin Doğrulandı',
      REJECTED: `Kimliğin Doğrulanamadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Kimliğin Doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Kimliğini Başarıyla Yükledin',
    successDescription: '',
    errorTitle: 'Kimliğni yüklerken teknik bir hata oluştu',
    errorDescription: 'Lütfen tekrar dene',
  },
  {
    id: 'SE',
    title: 'Selfie Çek',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: 'Lütfen yüzünü işaretli alana yerleştir',
        confirmationDescription:
          'Yüzünün net ve aydınlık bir şekilde çıktığından olduğundan emin ol',
      },
    ],
    trial: 1,
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
          crop: false,
          autoCrop: false,
          autoCapture: true,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Selfie Doğrula',
      PENDING_REVIEW: 'Selfie Yüklendi',
      PROCESSING: 'Selfie Doğrulanıyor',
      APPROVED: 'Selfie Doğrulandı',
      REJECTED: `Selfie Doğrulanamadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Selfie Doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: "Selfie'ni Başarıyla Yükledin",
    successDescription: '',
    errorTitle: "Selfie'ni yüklerken teknik bir hata oluştu",
    errorDescription: 'Lütfen tekrar dene',
  },
  {
    id: 'PA',
    title: 'Pasaport',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description:
          'Lütfen pasaportunuzu kutucuğun içinde olacak şekilde konumlandırın',
      },
    ],
    trial: 1,
    options: ['takePicture'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          title: 'Pasaport',
          crop: false,
          autoCrop: true,
          autoCapture: true,
          aspectRatio: 0.7042,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Pasaportunu Doğrula',
      PENDING_REVIEW: 'Pasaportun yüklendi',
      PROCESSING: 'Pasaportub doğrulanıyor',
      APPROVED: 'Pasaportun doğrulandı',
      REJECTED: `Pasaportn doğrulanamadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Pasaportn doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Pasaportunu başarıyla yükledin',
    successDescription: 'Bir sonraki adıma geçebilirsin',
    errorTitle: 'Pasaportunu yüklerken teknik bir hata oluştu',
    errorDescription: 'Lütfen tekrar dene',
  },
  {
    id: 'VA',
    title: 'Vize',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description:
          'Lütfen vizenizi kutucuğun içinde olacak şekilde konumlandırın',
      },
    ],
    trial: 1,
    options: ['takePicture'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: '',
    versionDescription: '',
    versions: {
      '': [
        {
          group: null,
          title: 'Vize',
          crop: false,
          autoCrop: true,
          autoCapture: true,
          aspectRatio: 0.7042,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Vize Doğrula',
      PENDING_REVIEW: 'Vizen yüklendi',
      PROCESSING: 'Vizen doğrulanıyor',
      APPROVED: 'Vizen doğrulandı',
      REJECTED: `Vizen doğrulanamadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Vizen doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Vizeni başarıyla yükledin',
    successDescription: 'Bir sonraki adıma geçebilirsin',
    errorTitle: 'Vizeni yüklerken teknik bir hata oluştu',
    errorDescription: 'Lütfen tekrar dene',
  },
  {
    id: 'UB',
    title: 'Adress Doğrulama',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: '',
      },
    ],
    trial: 1,
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
          crop: true,
          autoCrop: false,
          autoCapture: false,
          edevlet: true,
        },
      ],
      GSM: [
        {
          title: 'Türk Telekom',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
        {
          title: 'Turkcell',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
        {
          title: 'Vodafone',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
      Su: [
        {
          title: 'İski',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
      Doğalgaz: [
        {
          title: 'İgdaş',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
      Elektrik: [
        {
          title: 'Boğaziçi Elektrik',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
      Diğer: [
        {
          title: 'Diğer Tüm Kurumlar',
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Adres Belgeni Yükle',
      PENDING_REVIEW: 'Adres Belgen Yüklendi',
      PROCESSING: 'Adres Belgen Kontrol Ediliyor',
      APPROVED: 'Adres Belgen Yüklendi',
      REJECTED: `Adres Belgen Doğrulanamadı\nLütfen tekrar dene`,
      AUTOMATICALLY_REJECTED: `Adres Belgen Doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Adres belgeni başarıyla yükledin',
    successDescription: '',
    errorTitle: 'Adres belgeni yüklerken teknik bir hata oluştu',
    errorDescription: 'Lütfen tekrar dene',
  },
  {
    id: 'SG',
    title: 'Dijital Sözleşme',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'İmzanızı Atın',
        description: '',
      },
      {
        title: 'İmzanı Tekrar At',
        description: '',
      },
    ],
    trial: 1,
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
          crop: false,
          autoCrop: false,
          autoCapture: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Dijital Sözleşmeni İmzala',
      PENDING_REVIEW: 'Dijital Sözleşmen ve İmzan yüklendi',
      PROCESSING: 'İmzan Doğrulanıyor',
      APPROVED: 'Dijital Sözleşme İmzalandı',
      REJECTED: 'İmzan Doğrulanamadı\nLütfen tekrar dene',
      AUTOMATICALLY_REJECTED: 'İmzan Doğrulanamadı\nLütfen tekrar dene',
    },
    successTitle: 'Dijital Sözleşmeni Başarıyla Yükledin',
    successDescription: '',
    errorTitle: 'Sözleşmeni yüklerken teknik bir hata oluştu',
    errorDescription: 'Lütfen tekrar dene',
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
    trial: 1,
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
          crop: true,
          autoCrop: false,
          autoCapture: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Fiziksel Sözleşmeni Yükle',
      PENDING_REVIEW: 'Fiziksel Sözleşmen Yüklendi',
      PROCESSING: 'Fiziksel Sözleşmen Doğrulanıyor',
      APPROVED: 'Fiziksel Sözleşme İmzalandı',
      REJECTED: 'Fiziksel Sözleşmen Doğrulanamadı\nLütfen tekrar dene',
      AUTOMATICALLY_REJECTED:
        'Fiziksel Sözleşmen Doğrulanamadı\nLütfen tekrar dene',
    },
    successTitle: 'Fiziksel Sözleşmeni Başarıyla Yükledin',
    successDescription:
      'Tüm adımları tamamladın\n\nYüklediğin tüm belgeleri kontrol edip limitini en geç 48 saat içerisinde artıracağız',
    errorTitle: 'Sözleşmeni yüklerken teknik bir hata oluştu',
    errorDescription: 'Lütfen tekrar dene',
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
    case 'INCREMENT_TRIAL':
      return state.map((document) => {
        if (action.document_id === document.id) {
          return { ...document, trial: document.trial + 1 };
        }
        return document;
      });
    default:
      return state;
  }
};
