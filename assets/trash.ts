export const DATA = [
    {
        id: 78,
        title: "Saúde",
        subItens: [
            {
                id: 209,
                title: "Clínica Biama",
                details: [
                    {
                        address: "Rua das Flores, 123 - Centro",
                        email: "contato@biama.com",
                        phone: "(11) 98765-4321",
                        expedient: "Seg a Sex: 8h às 18h",
                        slug: "Clínica Biama",
                        observations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis nostrum minus velit totam commodi harum doloribus labore nemo ut, ad, deserunt dicta optio aut maxime delectus ullam repellendus tempore?",
                        isScheduling: 1,
                        scheduleOptions: [
                            {
                                speciality: "Clínica Geral",
                                availableSlots: [
                                    { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                    { date: "2024-12-09", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Pediatria",
                                availableSlots: [
                                    { date: "2024-12-03", times: ["Tarde"] },
                                    { date: "2024-12-10", times: ["Manhã", "Tarde"] },
                                ],
                            },
                            {
                                speciality: "Cardiologia",
                                availableSlots: [
                                    { date: "2024-12-11", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Dermatologia",
                                availableSlots: [
                                    { date: "2024-12-27", times: ["Tarde"] },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 210,
                title: "BabyLab",
                details: [
                    {
                        address: "Av. Paulista, 456 - Bela Vista",
                        email: "contato@babylab.com",
                        phone: "(11) 99876-5432",
                        expedient: "Seg a Sab: 9h às 17h",
                        slug: "BabyLab",
                        observations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis nostrum minus velit totam commodi harum doloribus labore nemo ut, ad, deserunt dicta optio aut maxime delectus ullam repellendus tempore?",
                        isScheduling: 1,
                        scheduleOptions: [
                            {
                                speciality: "Pediatria",
                                availableSlots: [
                                    { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                    { date: "2024-12-03", times: ["Tarde"] },
                                ],
                            },
                            {
                                speciality: "Neonatologia",
                                availableSlots: [
                                    { date: "2024-12-09", times: ["Manhã"] },
                                ],
                            },
                            {
                                speciality: "Testes Laboratoriais Infantis",
                                availableSlots: [
                                    { date: "2024-12-10", times: ["Tarde"] },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 10,
        title: 'Estética',
        subItens: [
            {
                id: 509,
                title: 'Clínica Fernanda',
                details: [{
                    address: 'Rua Bela, 11 - Jardim',
                    email: 'contato@fernanda.com',
                    phone: '(21) 97654-3210',
                    expedient: 'Seg a Sex: 9h às 18h',
                    slug: 'Clínica Fernanda',
                    observations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis nostrum minus velit totam commodi harum doloribus labore nemo ut, ad, deserunt dicta optio aut maxime delectus ullam repellendus tempore?",
                    isScheduling: 1,
                    scheduleOptions: [
                        {
                            speciality: "Dermatologia Estética",
                            availableSlots: [
                                { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                { date: "2024-12-09", times: ["Manhã"] },
                            ],
                        },
                        {
                            speciality: "Limpeza de Pele",
                            availableSlots: [
                                { date: "2024-12-03", times: ["Tarde"] },
                                { date: "2024-12-10", times: ["Manhã", "Tarde"] },
                            ],
                        },
                        {
                            speciality: "Aplicação de Botox",
                            availableSlots: [
                                { date: "2024-12-11", times: ["Manhã"] },
                            ],
                        },
                        {
                            speciality: "Tratamentos Anti-idade",
                            availableSlots: [
                                { date: "2024-12-27", times: ["Tarde"] },
                            ],
                        },
                    ],
                }]
            },
            {
                id: 510,
                title: 'Clínica LuxLab',
                details: [{
                    address: 'Av. Lux, 234 - Centro',
                    email: 'contato@luxlab.com',
                    phone: '(21) 99876-2109',
                    expedient: 'Seg a Sab: 10h às 20h',
                    slug: 'Clínica LuxLab',
                    observations: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non reiciendis nostrum minus velit totam commodi harum doloribus labore nemo ut, ad, deserunt dicta optio aut maxime delectus ullam repellendus tempore?",
                    isScheduling: 1,
                    scheduleOptions: [
                        {
                            speciality: "Procedimentos a Laser",
                            availableSlots: [
                                { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                { date: "2024-12-09", times: ["Manhã"] },
                            ],
                        },
                        {
                            speciality: "Rejuvenescimento Facial",
                            availableSlots: [
                                { date: "2024-12-03", times: ["Tarde"] },
                                { date: "2024-12-10", times: ["Manhã", "Tarde"] },
                            ],
                        },
                        {
                            speciality: "Microagulhamento",
                            availableSlots: [
                                { date: "2024-12-11", times: ["Manhã"] },
                            ],
                        },
                        {
                            speciality: "Peelings Químicos",
                            availableSlots: [
                                { date: "2024-12-27", times: ["Tarde"] },
                            ],
                        },
                    ],
                }]
            },
        ]
    },
    {
        id: 10,
        title: 'Petshop',
        subItens: []
    },
    {
        id: 49,
        title: 'Lazer',
        subItens: []
    }
];