export const initialDocuments = [
    {
        id: 'ID',
        secondary_id: 'DL',
        title: 'Kimlik & Sürücü Belgesi',
        passed: null,
        steps: [
            {
                title: 'Ön yüz',
                description:
                    'Lütfen dokümanın ön yüzünü kutucuğun içinde olacak şekilde konumlandırın',
            },
            {
                title: 'Arka yüz',
                description:
                    'Lütfen dokümanın arka yüzünü kutucuğun içinde olacak şekilde konumlandırın',
            },
        ],
        options: ['takePicture'],
        captureVideo: false,
        cameraFacing: 'environment',
        versions: [
            {
                title: 'Eski Kimlik',
                aspectRatio: 1.2,
                crop: true,
                autoCrop: false,
            },
            {
                title: 'Yeni Kimlik',
                aspectRatio: 0.63,
                crop: false,
                autoCrop: true,
            },
            {
                title: 'Yeni Sürücü Belgesi',
                aspectRatio: 0.63,
                crop: false,
                autoCrop: true,
            },
        ],
    },
    {
        id: 'PA',
        title: 'Pasaport',
        passed: null,
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
        versions: [
            {
                title: 'Pasaport',
                crop: false,
                autoCrop: true,
                aspectRatio: 0.7042,
            },
        ],
    },
    {
        id: 'VA',
        title: 'Vize',
        passed: null,
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
        versions: [
            {
                title: 'Vize',
                crop: false,
                autoCrop: true,
                aspectRatio: 0.7042,
            },
        ],
    },
    {
        id: 'UB',
        title: 'Adress Doğrulama',
        passed: null,
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
        versions: [
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
    },
    {
        id: 'SE',
        title: 'Selfie',
        passed: null,
        steps: [
            {
                title: '',
                description:
                    'Lütfen yüzünüzü belirtilen alanın içinde olacak şekilde konumlandırın',
            },
        ],
        options: ['takePicture'],
        type: 'video',
        captureVideo: true,
        cameraFacing: 'user',
        duration: 3,
        versions: [
            {
                title: 'Selfie',
                crop: false,
                autoCrop: false,
            },
        ],
    },
    {
        id: 'SG',
        title: 'Sözleşme',
        passed: null,
        steps: [
            {
                title: 'İmzanızı Çizin',
                description: '1/2',
            },
            {
                title: 'İmzanızı Tekrar Çizin',
                description: '2/2',
            },
        ],
        options: ['takePicture'],
        type: 'image',
        captureVideo: false,
        cameraFacing: null,
        versions: [
            {
                title: 'Sözleşme',
                crop: false,
                autoCrop: false,
            },
        ],
    },
]

export const documentsReducer = (state, action) => {
    switch (action.type) {
        case 'FILTER_DOCUMENTS':
            return state.filter(document => action.document_types.includes(document.id))
        case 'CHANGE_STATUS':
            return state.map(document => {
                if (action.document_id === document.id || (document.secondary_id && document.secondary_id.includes(action.document_id))) {
                    const updateDoc = { ...document, passed: action.passed }
                    return updateDoc
                }
                return document
            })
        default:
            return state
    }
}