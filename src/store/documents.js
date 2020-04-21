export const initialDocuments = [
  {
    id: 'ID',
    secondary_id: 'DL',
    title: 'Kimliğini Doğrula',
    status: 'NOT_UPLOADED',
    steps: [
      {
        title: 'Kimliğinin ön yüzünü fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\n\nKimliğinin işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol',
        confirmationTitle: 'Kimliğinin Ön Yüzü',
        confirmationDescription:
          'Kimliğinin bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol',
      },
      {
        title: 'Kimliğinin arka yüzünü fotoğrafını çek',
        description:
          'Fotoğrafı aydınlık bir alanda çek.\n\nKimliğinin işaretli alana tam oturduğundan ve okunaklı olduğundan emin ol',
        confirmationTitle: 'Kimliğinin Ön Yüzü',
        confirmationDescription:
          'Kimliğinin bütünüyle gözüktüğünden ve okunaklı olduğundan emin ol',
      },
    ],
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
      PENDING_REVIEW: 'Kimliğin yüklendi',
      PROCESSING: 'Kimliğin doğrulanıyor',
      APPROVED: 'Kimliğin doğrulandı',
      REJECTED: `Kimliğin doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Kimliğini başarıyla yükledin',
    successDescription:
      'Biz kimliğini kontrol ederken selfie çekimi ile devam et',
    errorTitle: 'Kimliğni yüklerken bir hata oluştu',
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
      PENDING_REVIEW: 'Selfie yüklendi',
      PROCESSING: 'Selfie doğrulanıyor',
      APPROVED: 'Selfie doğrulandı',
      REJECTED: `Selfie doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: "Selfie'ni başarıyla yükledin",
    successDescription:
      'Şimdi adresini doğrulamak için son 3 aya ait faturanı ya da ikametgah belgeni hazırla',
    errorTitle: "Selfie'ni yüklerken bir hata oluştu",
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
      PENDING_REVIEW: 'Pasaportun yüklendi',
      PROCESSING: 'Pasaportub doğrulanıyor',
      APPROVED: 'Pasaportun doğrulandı',
      REJECTED: `Pasaportn doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Pasaportunu başarıyla yükledin',
    successDescription: 'Bir sonraki adıma geçebilirsin',
    errorTitle: 'Pasaportunu yüklerken bir hata oluştu',
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
      PENDING_REVIEW: 'Vizen yüklendi',
      PROCESSING: 'Vizen doğrulanıyor',
      APPROVED: 'Vizen doğrulandı',
      REJECTED: `Vizen doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Vizeni başarıyla yükledin',
    successDescription: 'Bir sonraki adıma geçebilirsin',
    errorTitle: 'Vizeni yüklerken bir hata oluştu',
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
    options: ['takePicture', 'fileUpload', 'skipDocument'],
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
      PENDING_REVIEW: 'Adresin yüklendi',
      PROCESSING: 'Adresin doğrulanıyor',
      APPROVED: 'Adresin doğrulandı',
      REJECTED: `Adresin doğrulanamadı\nLütfen tekrar dene`,
    },
    successTitle: 'Adres belgeni başarıyla yükledin',
    successDescription: 'Sözleşmeyi imzalamak için devam et',
    errorTitle: 'Adres belgeni yüklerken bir hata oluştu',
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
      NOT_UPLOADED: 'Dijital sözleşmeni imzala',
      PENDING_REVIEW: 'Dijital sözleşmen ve imzan yüklendi',
      PROCESSING: 'İmzan doğrulanıyor',
      APPROVED: 'Dijital sözleşme imzalandı',
      REJECTED: 'İmzan doğrulanamadı\nLütfen tekrar dene',
    },
    successTitle: 'Dijital sözleşmeni başarıyla yükledin',
    successDescription: 'Fiziksel sözleşmeyi imzalamak için devam et',
    errorTitle: 'Dijital sözleşmeni yüklerken bir hata oluştu',
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
        },
      ],
    },
    messages: {
      NOT_UPLOADED: 'Fiziksel Sözleşmeni Yükle',
      PENDING_REVIEW: 'Fiziksel sözleşmen yüklendi',
      PROCESSING: 'Fiziksel sözleşmen doğrulanıyor',
      APPROVED: 'Fiziksel sözleşme İmzalandı',
      REJECTED: 'Fiziksel sözleşmen doğrulanamadı\nLütfen tekrar dene',
    },
    successTitle: 'Fiziksel sözleşmeni başarıyla yükledin',
    successDescription:
      'Tüm adımları tamamladın\n\nYüklediğin tüm belgeleri kontrol edip limitini en geç 48 saat içerisinde artıracağız',
    errorTitle: 'Fiziksel sözleşmeni yüklerken bir hata oluştu',
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
          const updateDoc = { ...document, status: action.status };
          return updateDoc;
        }
        return document;
      });
    default:
      return state;
  }
};
