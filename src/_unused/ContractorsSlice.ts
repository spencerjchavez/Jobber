/*
const exampleLogos = ['https://media.istockphoto.com/id/1409896319/vector/electric-symbol-design.jpg?s=612x612&w=0&k=20&c=y_iBidJXNbu_cVHRh43z-yChK3JQHM_YBnQj2fVkbp0=', 'https://media.istockphoto.com/id/1144423759/vector/electric-plug-icon-with-cord-stock-vector.jpg?s=612x612&w=0&k=20&c=gaL7s6huiB6tCI-wybq1Q1ui1zH4yoDB1cxUg8Z4aLw=', 'https://i.etsystatic.com/8684670/r/il/aa0978/6079415274/il_570xN.6079415274_knsh.jpg', 'https://cdn.logojoy.com/wp-content/uploads/20220228134805/optimal-electrical-logo.png', 'https://i.etsystatic.com/8684670/r/il/979f7b/5276223942/il_fullxfull.5276223942_nt8d.jpg', 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/10/28210546/fellow-electrical-by-jemstech-designcrowd.png', 'https://static.vecteezy.com/system/resources/thumbnails/001/912/953/small/electrician-holding-lightning-bolt-mascot-circle-black-and-white-vector.jpg', 'https://static.vecteezy.com/system/resources/thumbnails/001/912/953/small/electrician-holding-lightning-bolt-mascot-circle-black-and-white-vector.jpg', 'https://thumbs.dreamstime.com/b/electrician-logo-symbol-template-design-your-company-store-community-whatever-your-needs-electrician-logo-symbol-200948804.jpg'];

// Define the initial state
const initialContractorProps: { [contractorId: number]: ContractorProps} = {};
const initialContractorRatingsProps: { [contractorId: number]: ContractorRatingsProps} = {};
for(let i=0; i<20; i++) {
    const imageURL = exampleLogos[Math.floor(Math.random() * exampleLogos.length)];
    const exampleContractorProps: ContractorProps = {
        name: 'Electrician Joe',
        specialty: 'Master Plumber with 40 years of experience',
        jobCategories: ['Plumber', 'construction'],
        serviceArea: {
            location: {
                latitude: 40.2432358 + Math.random() - .5,
                longitude: -111.6552088 + Math.random() - .5,
            },
            radius: 100,
        },
        contractorId: String(i),
        profilePicture: {
            image: imageURL,
            imageThumbnail: imageURL,
        },
        portfolioImages: ['https://www.shutterstock.com/image-photo/male-plumber-diagnoses-pipes-water-260nw-2358150009.jpg', 'https://wentworthplumbing.ca/wp-content/uploads/2019/02/industrialplumbingpipes-800x450.jpg', 'https://trusteyman.com/wp-content/uploads/2020/07/commercial-plumber-1-1024x683.jpeg', 'https://i.redd.it/bj89ble82m5a1.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYv6qIVUeE4xz4sSJfYTLLzy3BB_HHFegqA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPbZtS_qJrmz1uh7evMzDLT700m1ZNt6YYcw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKz21h6nx_xn_lq_zTTzrULJHgLM3M9H7IA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpy6un9wKIJCsuRaxrkpIJhGt_JXxT0-oqw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpy6un9wKIJCsuRaxrkpIJhGt_JXxT0-oqw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0KTZd0RnLjjTx9tOrGo1caUxjY9I-srVLQ&s'],
        services: ['Plumbing Repair', 'Plumbing Installation', 'Emergency Plumbing'],
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        contactForm: simpleContactFormProps
    }

    const ratings = Array.from({length: 10}).map(() => {
        return {
            stars: Math.floor(Math.random() * 3) + 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.substring(0, Math.random()* 1200),
            contractorId: i,
            authorUserId: 1,
            date: 0
        }
    });
    initialContractorProps[i] = exampleContractorProps;
    initialContractorRatingsProps[i] = {
        contractorId: i,
        ratings,
        avgStars: ratings.reduce((sum, rating) => rating.stars + sum, 0) / (ratings.length ? ratings.length : 1)
    }
}
*/