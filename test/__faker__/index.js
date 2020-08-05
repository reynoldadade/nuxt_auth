function FakeTags() {
    return [
        { name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }, { name: 'e' }
    ]
}

function FakeFormData() {
    return {

        name: 'Frank Owusu',
        professional_description: 'Another test bio',
        location_address: 'Dansoman Accra',
        phone_number: "0123456780",
        latitude: 5.321,
        longitude: -0.134,
        primary_tag: "a",
        secondary_tag: "b",
        tertiary_tag: "c",
        password: '123456789',
        password_confirmation: '123456789',
        features: [
            {
                geometry: {
                    coordinates: [
                        [
                            [5.321, -0.132],
                            [5.311, -0.130],
                            [5.321, -0.139],
                            [5.301, -0.133],
                            [5.311, -0.131]
                        ]
                    ]
                }
            }
        ]
    }
}

function FakeUser() {
    return {
        access_token: 'some_random_string',
        user: {
            id: 1,
            name: 'Frank Owusu',
            email: 'test@walulel.com',
            country: "Ghana",
            postcode: "some-text",
            created_at: "some-date",
            active: true,
            avatar: "some-url",
        }
    }
}

function FakeArtisanInfo() {
    return {
        id: 48,
        location: {
            type: "Point",
            coordinates: [-0.1745, 5.557]
        },
        location_address: "Odwira Link, Accra, Greater Accra Region, Ghana",
        location_radius: 0,
        phone_number: "0553097733",
        professional_description: "Highly rated..",
        verification_document: "https://walulel-photos.s3.us-east-2.amazonaws.com/uploads/verification_documents/QLXrkSsNgXSJx44l90wc0SBC3.jpg",
        boundary: { "type": "Polygon", "coordinates": [[[-0.123543, 5.737475], [-0.177788, 5.642843], [-0.076164, 5.610385], [-0.025696, 5.702972], [-0.123543, 5.737475]]] },
        tags: [{ "id": 1, "name": "Boiler issue" }, { "id": 7, "name": "Construction equipment issue" }, { "id": 3, "name": "Carpentry issue" }]
    }
}

function FakeJob(properties = {}) {
    return {
        id: 14,
        title: "Some test",
        description: "taskStatusChangedtaskStatusChanged",
        location: { type: "Point", coordinates: [-0.0894, 5.6997] },
        location_address: "Santoe, Ashaiman, Greater Accra Region, Ghana",
        original_price: "100 - 200",
        actual_price: null,
        additional_information: null,
        status: "Unassigned",
        priority: "Medium",
        deadline: "2020-04-26 00:00:00",
        created_at: "2020-04-08T02:40:03.000000Z",
        posted_by: "Ibrahim Samad",
        published_at: null,
        tags: [{ id: 6, name: "Terrazzo issue" }],
        paid: false,
        amount_received: null,
        ...properties,
    }
}

function FakeJobs() {

    return [
        FakeJob(),
        FakeJob({
            id: 1,
            title: "AC Job",
            status: "Pending",
            location: { type: "Point", coordinates: [-0.0894, 5.6097] },

        })
    ]
}



export { FakeFormData, FakeTags, FakeUser, FakeArtisanInfo, FakeJob, FakeJobs }