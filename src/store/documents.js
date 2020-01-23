export const initialDocuments = [
    {
        id: 'ID',
        title: 'Kimlik',
        passed: null,
        steps: [
            {
                title: 'Ön yüz',
                description:
                    'Lütfen kimliğinizin ön yüzünü kutucuğun içinde olacak şekilde konumlandırın',
            },
            {
                title: 'Arka yüz',
                description:
                    'Lütfen kimliğinizin arka yüzünü kutucuğun içinde olacak şekilde konumlandırın',
            },
        ],
        options: ['takePicture'],
        captureVideo: false,
        cameraFacing: 'environment',
        crop: false,
        autoCrop: true,
        aspectRatio: 0.63,
    },
    {
        id: 'DL',
        title: 'Sürücü Belgesi',
        passed: null,
        steps: [
            {
                title: 'Ön yüz',
                description:
                    'Lütfen sürücü belgenizin ön yüzünü kutucuğun içinde olacak şekilde konumlandırın',
            },
            {
                title: 'Arka yüz',
                description:
                    'Lütfen sürücü belgenizin arka yüzünü kutucuğun içinde olacak şekilde konumlandırın',
            },
        ],
        options: ['takePicture'],
        type: 'image',
        captureVideo: false,
        cameraFacing: 'environment',
        crop: false,
        autoCrop: true,
        aspectRatio: 0.63,
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
        crop: false,
        autoCrop: true,
        aspectRatio: 0.7042,
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
        crop: false,
        autoCrop: true,
        aspectRatio: 0.7042,
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
        crop: true,
        autoCrop: false,
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
        crop: false,
        autoCrop: false,
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
        crop: false,
        autoCrop: false,
    },
]

const documentsReducer = (state, action) => {
    switch (action.type) {
        case 'FILTER_DOCUMENTS':
            return state.filter(document => action.types.includes(document.id))
        default:
            return state
    }
}

export default documentsReducer
