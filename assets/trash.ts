export const DATA = [
    {
        id: 78,
        title: "Exames Laboratoriais",
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
                                doctors: [
                                    {
                                        name: "Rafael Brito",
                                        availableSlots: [
                                            { date: "2024-12-02", times: ["Manhã"] },
                                            { date: "2024-12-09", times: ["Manhã", "Tarde"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                    {
                                        name: "Joana Darque",
                                        availableSlots: [
                                            { date: "2024-12-02", times: ["Tarde"] },
                                            { date: "2024-12-09", times: ["Manhã"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 400.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                ],
                            },
                            {
                                speciality: "Pediatria",
                                doctors: [
                                    {
                                        name: "Dr. Pedro Silva",
                                        availableSlots: [
                                            { date: "2024-12-03", times: ["Tarde"] },
                                            { date: "2024-12-10", times: ["Manhã"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                    {
                                        name: "Dra. Maria Oliveira",
                                        availableSlots: [
                                            { date: "2024-12-10", times: ["Tarde"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                ],
                            },
                            {
                                speciality: "Cardiologia",
                                doctors: [
                                    {
                                        name: "Dr. Carlos Almeida",
                                        availableSlots: [
                                            { date: "2024-12-11", times: ["Manhã"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                ],
                            },
                            {
                                speciality: "Dermatologia",
                                doctors: [
                                    {
                                        name: "Dra. Laura Souza",
                                        availableSlots: [
                                            { date: "2024-12-27", times: ["Tarde"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
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
                                doctors: [
                                    {
                                        name: "Dra. Julia Santos",
                                        availableSlots: [
                                            { date: "2024-12-02", times: ["Manhã", "Tarde"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                    {
                                        name: "Dr. Marcos Lima",
                                        availableSlots: [
                                            { date: "2024-12-03", times: ["Tarde"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                ],
                            },
                            {
                                speciality: "Neonatologia",
                                doctors: [
                                    {
                                        name: "Dra. Ana Mendes",
                                        availableSlots: [
                                            { date: "2024-12-09", times: ["Manhã"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
                                ],
                            },
                            {
                                speciality: "Testes Laboratoriais Infantis",
                                doctors: [
                                    {
                                        name: "Dr. Roberto Silva",
                                        availableSlots: [
                                            { date: "2024-12-10", times: ["Tarde"] },
                                        ],
                                        schedObservations: "O valor da Consulta é de R$ 190.00, pagamento apenas em dinheiro, ou por meio do plano de saúde UNIMED."
                                    },
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
        title: 'Odontologia',
        subItens: []
    },
    {
        id: 49,
        title: 'Clínicas Gerais',
        subItens: []
    },
    {
        id: 56,
        title: 'Oftalmologia',
        subItens: []
    },
    {
        id: 57,
        title: 'Dermatologia',
        subItens: []
    },
    {
        id: 58,
        title: 'Cardiologia',
        subItens: []
    },
    {
        id: 59,
        title: 'Pediatria',
        subItens: []
    },
    {
        id: 60,
        title: 'Ginecologia e Obstetrícia',
        subItens: []
    },
    {
        id: 61,
        title: 'Ortopedia',
        subItens: []
    },
    {
        id: 62,
        title: 'Medicina do Trabalho',
        subItens: []
    },
    {
        id: 63,
        title: 'Psiquiatria',
        subItens: []
    },
];