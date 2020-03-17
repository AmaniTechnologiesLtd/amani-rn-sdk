export const initialDocuments = [
  {
    id: 'ID',
    secondary_id: 'DL',
    title: 'Kimliğini Doğrula',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Belgenin ön yüzünü fotoğrafını çek',
        description:
          'Kimliğinin tam oturduğundan ve okunaklı olduğundan emin ol',
        confirmationTitle: 'Belgenin Ön Yüzü',
      },
      {
        title: 'Belgenin arka yüzünü fotoğrafını çek',
        description:
          'Kimliğinin tam oturduğundan ve okunaklı olduğundan emin ol',
        confirmationTitle: 'Belgenin Ön Yüzü',
      },
    ],
    options: ['takePicture'],
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
        },
        {
          title: 'Nüfus Cüzdanı (Eski Tip)',
          aspectRatio: 1.2,
          crop: false,
          autoCrop: true,
        },
        {
          title: 'Ehliyet (Yeni Tip)',
          aspectRatio: 0.63,
          crop: false,
          autoCrop: true,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Kimliğini Doğrula',
      PENDING_REVIEW: 'Kimliğin doğrulanıyor',
      PROCESSING: 'Kimliğin doğrulanıyor',
      APPROVED: 'Kimliğin doğrulandı',
      REJECTED: `Kimliğin doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Kimliğini başarıyla yükledin',
    successDescription:
      'Biz kimliğini kontrol ederken selfie çekimi ile devam et',
  },
  {
    id: 'SE',
    title: 'Selfie',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: '',
        description: 'Lütfen yüzünü işaretli alana yerleştir',
      },
    ],
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
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Selfie Doğrula',
      PENDING_REVIEW: 'Selfie doğrulanıyor',
      PROCESSING: 'Selfie doğrulanıyor',
      APPROVED: 'Selfie doğrulandı',
      REJECTED: `Selfie doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: "Selfie'ni başarıyla yükledin",
    successDescription:
      "Biz selfie'ni kontrol ederken lütfen adresini doğrulama adımına geç",
    nextStepDescription:
      'Adresini doğrulamak için son 3 aya ait faturanı ya da ikametgah belgeni hazırla',
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
          aspectRatio: 0.7042,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Pasaportunu Doğrula',
      PENDING_REVIEW: 'Pasaportun doğrulanıyor',
      PROCESSING: 'Pasaportub doğrulanıyor',
      APPROVED: 'Pasaportun doğrulandı',
      REJECTED: `Pasaportn doğrulanamadı\nLütfen tekrar dene`,
    },
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
          aspectRatio: 0.7042,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Vize Doğrula',
      PENDING_REVIEW: 'Vizen doğrulanıyor',
      PROCESSING: 'Vizen doğrulanıyor',
      APPROVED: 'Vizen doğrulandı',
      REJECTED: `Vizen doğrulanamadı\nLütfen tekrar dene`,
    },
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
    options: ['takePicture', 'fileUpload'],
    type: 'image',
    captureVideo: false,
    cameraFacing: 'environment',
    versionTitle: 'Belge Tipini Seçin',
    versionDescription:
      'Adresini doğrulamak için kendi adına kesilmiş (son 3 aya ait) bir fatura ya da ikametgah belgeni yükle. İstediğin belgeyi fotoğrafını çekerek ya da dijital (pdf) olarak yükleyebilirsin.\n\nEğer yanında hiçbir belge yoksabu adımı şimdilik atlayabilir ya da hemen e-devletten ikametgah belgeni pdf olarak indirip yükleyebilirsin.',
    versions: {
      Devlet: [
        {
          title: 'E-Devlet İkametgah Belgesi',
          crop: true,
          autoCrop: false,
          edevlet: true,
        },
      ],
      GSM: [
        {
          title: 'Türk Telekom',
          crop: true,
          autoCrop: false,
        },
        {
          title: 'Turkcell',
          crop: true,
          autoCrop: false,
        },
        {
          title: 'Vodafone',
          crop: true,
          autoCrop: false,
        },
      ],
      Su: [
        {
          title: 'İski',
          crop: true,
          autoCrop: false,
        },
      ],
      Doğalgaz: [
        {
          title: 'İgdaş',
          crop: true,
          autoCrop: false,
        },
      ],
      Elektrik: [
        {
          title: 'Boğaziçi Elektrik',
          crop: true,
          autoCrop: false,
        },
      ],
      Diğer: [
        {
          title: 'Diğer Tüm Kurumlar',
          crop: true,
          autoCrop: false,
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Adresini Doğrula',
      PENDING_REVIEW: 'Adresin doğrulanıyor',
      PROCESSING: 'Adresin doğrulanıyor',
      APPROVED: 'Adresin doğrulandı',
      REJECTED: `Adresin doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Adres belgeni başarıyla yükledin',
    successDescription: 'Sözleşmeyi imzalamak için devam et',
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
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Dijital Sözleşmeni İmzala',
      PENDING_REVIEW: 'İmzan doğrulanıyor',
      PROCESSING: 'İmzan doğrulanıyor',
      APPROVED: 'Dijital sözleşme İmzalandı',
      REJECTED: `İmzan doğrulanamadı\nLütfen tekrar dene`,
    },
  },
];

export const documentsReducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_DOCUMENTS':
      return state.filter(document =>
        action.document_types.includes(document.id),
      );
    case 'CHANGE_STATUS':
      return state.map(document => {
        if (
          action.document_id === document.id ||
          (document.secondary_id &&
            document.secondary_id.includes(action.document_id))
        ) {
          const updateDoc = { ...document, status: action.status };
          return updateDoc;
        }
        return document;
      });
    default:
      return state;
  }
};
