import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const LogoComponents = {
    'Kredivo Group': () => (
        <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
        </div>
    ),
    'LIVSPACE': () => (
        <div className="flex items-center">
            <div className="w-6 h-6 border-2 border-black rounded-sm mr-2"></div>
            <span className="font-bold text-xl">LIVSPACE</span>
        </div>
    ),
    'moglix': () => (
        <span className="font-bold text-2xl">moglix</span>
    ),
    'turtlemint': () => (
        <div className="flex items-center">
            <span className="font-bold text-xl">turtlemint</span>
            <span className="text-2xl ml-1"></span>
        </div>
    ),
    'sociolla': () => (
        <span className="font-light text-2xl italic">sociolla</span>
    ),
    'LEAP': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded mr-2 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white"></div>
            </div>
            <span className="font-bold text-xl">LEAP</span>
        </div>
    ),
    'waresix': () => (
        <div className="flex items-center">
            <span className="font-bold text-xl mr-1">W</span>
            <span className="font-normal text-xl">waresix</span>
        </div>
    ),
    'atomberg': () => (
        <div className="flex items-center">
            <span className="font-normal text-xl">atomberg</span>
            <span className="text-sm ml-1 text-gray-500">"Why not?"</span>
        </div>
    ),
    'evermos': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded-full mr-2 flex items-center justify-center">
                <span className="text-white text-sm">☺</span>
            </div>
            <span className="font-normal text-xl">evermos</span>
        </div>
    ),
    'KiotViet': () => (
        <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
            <div className="w-6 h-6 bg-gray-400 rounded-full mr-2 -ml-1"></div>
            <span className="font-normal text-xl">KiotViet</span>
        </div>
    ),
    'HYPERFAST': () => (
        <div className="flex items-center">
            <span className="font-bold text-xl italic transform -skew-x-12">HYPERFAST</span>
            <span className="text-red-500 text-xl ml-1">.</span>
        </div>
    ),
    'CITYMALL': () => (
        <span className="font-bold text-xl tracking-wider">CITYMALL</span>
    ),
    'RedDoorz': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded mr-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-bold text-xl">RedDoorz</span>
        </div>
    ),
    'OFLOAD': () => (
        <span className="font-bold text-2xl italic">OFLOAD</span>
    ),
    'betterplace': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 border-2 border-black rounded-full mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <span className="font-normal text-xl">betterplace</span>
        </div>
    ),
    'Pomelo': () => (
        <span className="font-bold text-2xl">Pomelo.</span>
    ),
    'VAYANA': () => (
        <div className="flex items-center">
            <div className="text-2xl mr-2">⬜</div>
            <span className="font-bold text-xl">VAYANA™</span>
        </div>
    ),
    'Believe': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black mr-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-white transform rotate-45"></div>
            </div>
            <span className="font-normal text-xl">Believe</span>
        </div>
    ),
    'INFINITY': () => (
        <div className="text-center">
            <div className="flex items-center justify-center">
                <span className="text-2xl mr-1">∞</span>
                <span className="font-bold text-lg">INFINITY</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">FINCORP SOLUTIONS</div>
            <div className="text-xs text-gray-500">SANKALP AAPKA, SAATH HUMARA</div>
        </div>
    ),
    'Deskera': () => (
        <span className="font-bold text-2xl">Deskera</span>
    ),
    'THE AYURVEDA EXPERIENCE': () => (
        <div className="text-center">
            <div className="w-8 h-8 border-2 border-black rounded-full mx-auto mb-1 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className="text-xs font-bold">THE</div>
            <div className="text-sm font-bold">AYURVEDA</div>
            <div className="text-xs font-bold">EXPERIENCE</div>
        </div>
    ),
    'saltmine': () => (
        <span className="font-normal text-2xl">saltmine</span>
    ),
    'timo': () => (
        <span className="font-light text-3xl italic">timo</span>
    ),
    'Walko': () => (
        <span className="font-bold text-2xl italic">Walko</span>
    ),
    'WATERFIELD': () => (
        <div className="flex items-center">
            <span className="text-xl mr-2">H</span>
            <span className="font-normal text-xl">WATERFIELD</span>
        </div>
    ),
    'Sleek': () => (
        <span className="font-bold text-2xl">Sleek</span>
    ),
    'AMP': () => (
        <span className="font-black text-2xl italic transform -skew-x-12">AMP</span>
    ),
    'MARKETWOLF': () => (
        <span className="font-bold text-xl tracking-wide">MARKETWOLF</span>
    ),
    'Feedo': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full mr-2 flex items-center justify-center">
                <span className="text-white text-xl">F</span>
            </div>
            <span className="font-bold text-xl">Feedo</span>
        </div>
    ),
    'desty': () => (
        <span className="font-bold text-2xl italic">desty</span>
    ),
    'Drivetrain': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 border-2 border-black rounded-full mr-2"></div>
            <span className="font-bold text-xl">Drivetrain</span>
        </div>
    ),
    'medici': () => (
        <span className="font-bold text-2xl">medici</span>
    ),
    'dbo': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded-full mr-2"></div>
            <span className="font-bold text-xl">dbo</span>
        </div>
    ),
    'MEDIKE': () => (
        <span className="font-bold text-xl tracking-wider">MEDIKE</span>
    ),
    'EDUPIA': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full mr-2 flex items-center justify-center">
                <span className="text-white text-xl">E</span>
            </div>
            <span className="font-bold text-xl">EDUPIA</span>
        </div>
    ),
    'nirogstreet': () => (
        <div className="flex items-center">
            <div className="w-8 h-8 mr-2">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                </svg>
            </div>
            <div>
                <div className="font-bold text-lg">nirog</div>
                <div className="font-normal text-lg">street</div>
            </div>
        </div>
    )
};

const StartupGrid = () => {
    const [selectedSector, setSelectedSector] = useState('All Sectors');
    const [selectedRegion, setSelectedRegion] = useState('All Regions');
    const [selectedStage, setSelectedStage] = useState('Stage of investment');
    const [selectedCompany, setSelectedCompany] = useState(null);

    const companyDetails = {
        'Kredivo Group': {
            description: 'Leading digital lending platform in Southeast Asia providing instant credit solutions.',
            details: 'Kredivo offers digital credit cards and buy now pay later services in Indonesia and Vietnam, with instant approval and flexible payment options.',
            website: 'https://kredivo.com/',
            investmentYear: '2019',
            jungleTeam: 'Rishab Malik',
            founders: 'Akshay Garg, Umang Rustagi',
            category: 'FinTech',
            investmentStage: 'Unicorn'
        },
        'LIVSPACE': {
            description: 'Asia\'s largest online home interior design platform connecting homeowners with designers.',
            details: 'Livspace provides end-to-end home interior services including design, renovation, and furniture, serving customers across multiple Indian cities.',
            website: 'https://livspace.com/',
            investmentYear: '2020',
            jungleTeam: 'Rishab Malik',
            founders: 'Anuj Srivastava, Ramakant Sharma',
            category: 'PropTech',
            investmentStage: 'Unicorn'
        },
        'moglix': {
            description: 'B2B e-commerce platform for industrial supplies and procurement solutions.',
            details: 'Moglix specializes in industrial tools, safety equipment, and MRO products, serving manufacturing companies across India with digital procurement solutions.',
            website: 'https://moglix.com/',
            investmentYear: '2018',
            jungleTeam: 'Rishab Malik',
            founders: 'Rahul Garg',
            category: 'B2B Commerce',
            investmentStage: 'Unicorn'
        },
        'turtlemint': {
            description: 'Digital insurance platform simplifying insurance buying process in India.',
            details: 'Turtlemint provides comparison tools and expert advice for insurance products, making insurance purchase transparent and accessible.',
            website: 'https://turtlemint.com/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Dhirendra Mahyavanshi, Anand Prabhudesai',
            category: 'InsurTech',
            investmentStage: 'Unicorn'
        },
        'sociolla': {
            description: 'Indonesia\'s leading beauty e-commerce platform offering authentic products.',
            details: 'Sociolla provides a wide range of beauty products from international and local brands, with a focus on authenticity and customer experience.',
            website: 'https://www.sociolla.com/',
            investmentYear: '2019',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Christopher Madiam, John Rasjid',
            category: 'E-commerce',
            investmentStage: 'Series D'
        },
        'LEAP': {
            description: 'Legal tech platform transforming legal education and practice in India.',
            details: 'LEAP offers online legal courses, certification programs, and career services for law students and professionals.',
            website: 'https://leap.legal/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Rigved Lyenger, Tanuj Kalra',
            category: 'EdTech',
            investmentStage: 'Series A'
        },
        'waresix': {
            description: 'Indonesian logistics platform optimizing trucking and warehouse operations.',
            details: 'Waresix connects shippers with truckers and warehouses, providing end-to-end logistics solutions with real-time tracking.',
            website: 'https://www.waresix.com/',
            investmentYear: '2020',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Andree Susanto, Edwin Wibowo',
            category: 'Logistics',
            investmentStage: 'Series C'
        },
        'atomberg': {
            description: 'Energy-efficient home appliances manufacturer in India.',
            details: 'Atomberg specializes in smart, energy-saving fans and other home appliances with IoT capabilities.',
            website: 'https://atomberg.com/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Manoj Meena, Sibabrata Das',
            category: 'Hardware',
            investmentStage: 'Series B'
        },
        'evermos': {
            description: 'Social commerce platform empowering Indonesian micro-entrepreneurs.',
            details: 'Evermos enables resellers to build businesses through its app, offering a wide range of products and business tools.',
            website: 'https://evermos.com/',
            investmentYear: '2020',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Ghufron Mustaqim, Iqbal Muslimin',
            category: 'Social Commerce',
            investmentStage: 'Series B'
        },
        'KiotViet': {
            description: 'Vietnam\'s leading retail management software for SMEs.',
            details: 'KiotViet provides POS, inventory management, and business analytics tools for small retailers across Vietnam.',
            website: 'https://www.kiotviet.vn/',
            investmentYear: '2019',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Tran Viet Anh, Nguyen Van Dung',
            category: 'SaaS',
            investmentStage: 'Series B'
        },
        'HYPERFAST': {
            description: 'Digital freight forwarding platform in Vietnam.',
            details: 'Hyperfast provides end-to-end logistics solutions including trucking, warehousing, and customs clearance.',
            website: 'https://hyperfast.io/',
            investmentYear: '2021',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Tran Hoang Ngan, Nguyen Quoc Thang',
            category: 'Logistics Tech',
            investmentStage: 'Series A'
        },
        'CITYMALL': {
            description: 'Social commerce platform serving tier 2+ cities in India.',
            details: 'Citymall connects local communities with group buying opportunities and community leaders as resellers.',
            website: 'https://www.citymall.live/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Angad Kikla, Naisheel Verdhan',
            category: 'Social Commerce',
            investmentStage: 'Series B'
        },
        'RedDoorz': {
            description: 'Budget hospitality chain across Southeast Asia.',
            details: 'RedDoorz operates and franchises budget hotels with standardized quality across multiple Southeast Asian countries.',
            website: 'https://www.reddoorz.com/',
            investmentYear: '2019',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Amit Saberwal, Asheesh Saxena',
            category: 'Hospitality',
            investmentStage: 'Series D'
        },
        'OFLOAD': {
            description: 'Digital platform for construction equipment rental in India.',
            details: 'Ofload connects equipment owners with construction companies, optimizing utilization of heavy machinery.',
            website: 'https://www.ofload.com/',
            investmentYear: '2022',
            jungleTeam: 'Rishab Malik',
            founders: 'Bhuvan Modi, Nitin Mittal',
            category: 'Construction Tech',
            investmentStage: 'Series A'
        },
        'betterplace': {
            description: 'Workforce management platform for blue-collar employees in India.',
            details: 'Betterplace provides background verification, payroll, and skilling solutions for frontline workers.',
            website: 'https://www.betterplace.co.in/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Pravin Agarwala, Saurabh Tandon',
            category: 'HR Tech',
            investmentStage: 'Series C'
        },
        'Pomelo': {
            description: 'Fashion e-commerce platform with own-brand products in Southeast Asia.',
            details: 'Pomelo designs and sells its own fashion collections through online and offline channels across multiple countries.',
            website: 'https://www.pomelofashion.com/',
            investmentYear: '2018',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'David Jou, Casey Liang',
            category: 'Fashion Tech',
            investmentStage: 'Series C'
        },
        'VAYANA': {
            description: 'Supply chain finance platform connecting lenders and businesses.',
            details: 'Vayana provides invoice discounting and working capital solutions for SMEs in global trade networks.',
            website: 'https://vayana.com/',
            investmentYear: '2020',
            jungleTeam: 'Rishab Malik',
            founders: 'Ram Iyer, Vishwanathan Ramachandran',
            category: 'FinTech',
            investmentStage: 'Series B'
        },
        'Believe': {
            description: 'Digital music distribution and artist services platform.',
            details: 'Believe provides distribution, marketing, and monetization services for independent artists and labels worldwide.',
            website: 'https://www.believe.com/',
            investmentYear: '2019',
            jungleTeam: 'Global Team',
            founders: 'Denis Ladegaillerie',
            category: 'Media Tech',
            investmentStage: 'Public'
        },
        'INFINITY': {
            description: 'Financial services platform offering lending and wealth solutions.',
            details: 'Infinity provides personal loans, business loans, and investment products to customers across India.',
            website: 'https://www.infinityfincorp.com/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Sumit Bali, Vinay Kumar',
            category: 'FinTech',
            investmentStage: 'Growth'
        },
        'Deskera': {
            description: 'Cloud-based business software for SMEs in Southeast Asia.',
            details: 'Deskera offers ERP, accounting, and HR solutions tailored for small and medium businesses.',
            website: 'https://www.deskera.com/',
            investmentYear: '2020',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Shashank Dixit, Paritosh Sharma',
            category: 'SaaS',
            investmentStage: 'Series B'
        },
        'THE AYURVEDA EXPERIENCE': {
            description: 'Wellness brand offering authentic Ayurvedic products and services.',
            details: 'The company provides traditional Ayurvedic treatments, products, and wellness retreats globally.',
            website: 'https://www.theayurvedaexperience.com/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Shreedha Singh, Arjun Vaidya',
            category: 'Wellness',
            investmentStage: 'Series A'
        },
        'saltmine': {
            description: 'Workplace design and management platform for enterprises.',
            details: 'Saltmine provides AI-powered workplace planning and management software for corporate real estate teams.',
            website: 'https://saltmine.com/',
            investmentYear: '2021',
            jungleTeam: 'Global Team',
            founders: 'Shagufta Anurag, Shyam Goyal',
            category: 'PropTech',
            investmentStage: 'Series A'
        },
        'timo': {
            description: 'Digital banking platform in Vietnam.',
            details: 'Timo offers mobile-first banking services including accounts, payments, and financial management tools.',
            website: 'https://timo.vn/',
            investmentYear: '2019',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Henry Nguyen, Nguyen Minh Tam',
            category: 'Neobank',
            investmentStage: 'Series B'
        },
        'Walko': {
            description: 'Healthy snacks and food products brand.',
            details: 'Walko produces and markets healthy, convenient snack options through modern retail channels.',
            website: 'https://walkofood.com/',
            investmentYear: '2022',
            jungleTeam: 'Rishab Malik',
            founders: 'Ankit Agarwal, Ankur Agarwal',
            category: 'F&B',
            investmentStage: 'Series A'
        },
        'WATERFIELD': {
            description: 'Financial services platform for corporate banking needs.',
            details: 'Waterfield provides treasury, cash management, and trade finance solutions for businesses.',
            website: 'https://www.waterfield.in/',
            investmentYear: '2020',
            jungleTeam: 'Rishab Malik',
            founders: 'Souvik Sengupta, Amit Doshi',
            category: 'FinTech',
            investmentStage: 'Series B'
        },
        'Sleek': {
            description: 'Digital incorporation and accounting services in Singapore.',
            details: 'Sleek helps entrepreneurs incorporate companies, manage accounting, and stay compliant with regulations.',
            website: 'https://sleek.com/',
            investmentYear: '2019',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Julien Labruyere, Adrien Barthel',
            category: 'RegTech',
            investmentStage: 'Series B'
        },
        'AMP': {
            description: 'Digital energy platform for renewable energy assets.',
            details: 'AMP provides monitoring, analytics, and optimization for solar and other renewable energy systems.',
            website: 'https://www.amp.energy/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Pinaki Saha, Sagar Gubbi',
            category: 'CleanTech',
            investmentStage: 'Series A'
        },
        'MARKETWOLF': {
            description: 'Mobile-first trading platform for retail investors.',
            details: 'Marketwolf offers options trading with simplified interfaces and educational content for new traders.',
            website: 'https://marketwolf.com/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Rahul Madduri, Ritesh Chugh',
            category: 'FinTech',
            investmentStage: 'Series A'
        },
        'Feedo': {
            description: 'Employee engagement and feedback platform',
            details: 'Feedo provides pulse surveys, analytics, and action planning tools to improve workplace culture.',
            website: 'https://feedo.ai/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Ankit Nagori, Sandeep Singh',
            category: 'HR Tech',
            investmentStage: 'Series A'
        },
        'desty': {
            description: 'Online store builder for all social sellers',
            details: 'Desty provides tools for sellers, influencers, and creators to create their online presence and build their own branded online store in minutes for free. Key features include Desty Page, a landing page generator, and Desty Store, a simple & easy-to-use online shop creator.',
            website: 'https://www.desty.app/',
            investmentYear: '2022',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Mulyono Xu, Yash Sankrityayan, Bill Wang',
            category: 'Software Tech',
            investmentStage: 'Series A'
        },
        'Drivetrain': {
            description: 'Financial planning and analysis platform for businesses',
            details: 'Drivetrain helps companies with budgeting, forecasting, and financial modeling in a collaborative environment.',
            website: 'https://drivetrain.ai/',
            investmentYear: '2021',
            jungleTeam: 'Rishab Malik',
            founders: 'Rahul Vishwakarma, Manish Sharma',
            category: 'FinTech',
            investmentStage: 'Series A'
        },
        'medici': {
            description: 'Healthcare technology platform connecting doctors and patients',
            details: 'Medici offers telemedicine, EHR, and practice management tools for healthcare providers.',
            website: 'https://medici.md/',
            investmentYear: '2020',
            jungleTeam: 'Rishab Malik',
            founders: 'Clarke Patterson, John Voris',
            category: 'HealthTech',
            investmentStage: 'Series B'
        },
        'dbo': {
            description: 'Digital banking infrastructure platform in Indonesia.',
            details: 'dbo provides API-based banking services and financial infrastructure for fintech companies.',
            website: 'https://dbo.id/',
            investmentYear: '2021',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Jonathan Aditya, William Hadinata',
            category: 'Banking Tech',
            investmentStage: 'Series A'
        },
        'MEDIKE': {
            description: 'Digital healthcare platform for medical professionals.',
            details: 'Medike provides continuing education, networking, and practice tools for doctors in emerging markets.',
            website: 'https://medike.com/',
            investmentYear: '2022',
            jungleTeam: 'Rishab Malik',
            founders: 'Arjun Kumar, Priya Malhotra',
            category: 'HealthTech',
            investmentStage: 'Seed'
        },
        'EDUPIA': {
            description: 'Online English learning platform for Vietnamese students.',
            details: 'Edupia offers interactive English courses for K-12 students with native teacher videos and AI practice.',
            website: 'https://edupia.vn/',
            investmentYear: '2020',
            jungleTeam: 'Karlissa Adelaide',
            founders: 'Tony Ngo, Hoa Nguyen',
            category: 'EdTech',
            investmentStage: 'Series B'
        },
        'nirogstreet': {
            description: 'Digitizing the alternative medicine supply chain in Asia',
            details: 'NirogStreet is India\'s first and largest Ayurveda tech startup, led with a vision to make Ayurveda mainstream in the global healthcare ecosystem. The company offers a wide portfolio of services including integrated doctor-led prescription e-commerce enablement, peer-to-peer learning for Ayurvedic doctors, digital health record management, and smart clinics.',
            website: 'https://nirogstreet.com/',
            investmentYear: '2022',
            jungleTeam: 'Rishab Malik',
            founders: 'Ram Kumar, Robin Jha',
            category: 'B2B Tech',
            investmentStage: 'Series B and beyond'
        }
    };

    const companies = [
        { name: 'Kredivo Group', stage: 'Unicorn' },
        { name: 'LIVSPACE', stage: 'Unicorn' },
        { name: 'moglix', stage: 'Unicorn' },
        { name: 'turtlemint', stage: 'Unicorn' },
        { name: 'sociolla', stage: '' },
        { name: 'LEAP', stage: '' },
        { name: 'waresix', stage: '' },
        { name: 'atomberg', stage: '' },
        { name: 'evermos', stage: '' },
        { name: 'KiotViet', stage: '' },
        { name: 'HYPERFAST', stage: '' },
        { name: 'CITYMALL', stage: '' },
        { name: 'RedDoorz', stage: '' },
        { name: 'OFLOAD', stage: '' },
        { name: 'betterplace', stage: '' },
        { name: 'Pomelo', stage: '' },
        { name: 'VAYANA', stage: '' },
        { name: 'Believe', stage: '' },
        { name: 'INFINITY', stage: '' },
        { name: 'Deskera', stage: '' },
        { name: 'THE AYURVEDA EXPERIENCE', stage: '' },
        { name: 'saltmine', stage: '' },
        { name: 'timo', stage: '' },
        { name: 'Walko', stage: '' },
        { name: 'WATERFIELD', stage: '' },
        { name: 'Sleek', stage: '' },
        { name: 'AMP', stage: '' },
        { name: 'MARKETWOLF', stage: '' },
        { name: 'Feedo', stage: '' },
        { name: 'desty', stage: '' },
        { name: 'Drivetrain', stage: '' },
        { name: 'medici', stage: '' },
        { name: 'dbo', stage: '' },
        { name: 'MEDIKE', stage: '' },
        { name: 'EDUPIA', stage: '' },
        { name: 'nirogstreet', stage: '' }
    ];

    const FilterDropdown = ({ value, onChange, placeholder }) => (
        <div className="relative">
            <button className="flex items-center justify-between w-full px-4 py-3 text-left bg-white border border-gray-500 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent min-w-[200px] gap-16">
                <span className="text-gray-700">{value}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
        </div>
    );

    const CompanyCard = ({ company }) => {
        const LogoComponent = LogoComponents[company.name];

        return (
            <div
                className="relative border border-gray-400 p-8 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCompany(company)}
            >
                {company.stage && (
                    <div className="absolute top-4 right-4">
                        <span className="text-blue-700 text-sm font-light bg-blue-50 px-3 py-2 rounded-2xl">
                            {company.stage}
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-center h-20">
                    {LogoComponent ? <LogoComponent /> : <span className="text-xl">{company.name}</span>}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full mt-20 max-w-7xl mx-auto p-6">
            <div className="flex gap-4 mb-8">
                <FilterDropdown
                    value={selectedSector}
                    onChange={setSelectedSector}
                    placeholder="All Sectors"
                />
                <FilterDropdown
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                    placeholder="All Regions"
                />
                <FilterDropdown
                    value={selectedStage}
                    onChange={setSelectedStage}
                    placeholder="Stage of investment"
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {companies.map((company, index) => (
                    <CompanyCard key={index} company={company} />
                ))}
            </div>

            {selectedCompany && (
                <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-5 ">
                    <div className='absolute bg-blue-700 w-full h-full opacity-80'>
                    </div>
                    <div className="bg-white p-8 max-w-7xl w-full h-[70%] lg:h-[80%] relative">
                        <button
                            onClick={() => setSelectedCompany(null)}
                            className="absolute top-5 right-5 p-4 cursor-pointer hover:bg-blue-700 text-white bg-black rounded-full"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="mb-6 mt-12 flex flex-col gap-3 lg:p-8">
                            <div className="flex items-center mb-4">
                                <div className="mr-4 text-2xl font-bold lg:text-4xl">
                                    {LogoComponents[selectedCompany.name] ?
                                        React.createElement(LogoComponents[selectedCompany.name]) :
                                        <span className="text-2xl font-bold lg:text-4xl">{selectedCompany.name}</span>
                                    }
                                </div>
                            </div>

                            <h2 className="text-base md:text-xl lg:text-3xl font-medium mb-2">
                                {companyDetails[selectedCompany.name]?.description ||
                                    `${selectedCompany.name} - Leading technology company`}
                            </h2>

                            {companyDetails[selectedCompany.name]?.details && (
                                <p className="text-gray-600 text-sm mb-4 lg:text-lg">
                                    {companyDetails[selectedCompany.name].details}
                                </p>
                            )}

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-4 mt-10">
                                <div>
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Website</p>
                                    <a
                                        href={companyDetails[selectedCompany.name].website}
                                        className="text-gray-900 underline text-sm lg:text-lg font-medium"
                                        target="_blank"
                                    >
                                        {companyDetails[selectedCompany.name].website}
                                    </a>
                                </div>


                                <div>
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Investment Year</p>
                                    <p className="text-sm lg:text-lg font-medium">{companyDetails[selectedCompany.name].investmentYear}</p>
                                </div>


                                <div className="hidden lg:block">
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Jungle team</p>
                                    <a href="#" className="text-gray-900 underline text-sm lg:text-lg font-medium">
                                        {companyDetails[selectedCompany.name].jungleTeam}
                                    </a>
                                </div>


                                <div>
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Founders</p>
                                    <div className="text-sm">
                                        {companyDetails[selectedCompany.name].founders.split(', ').map((founder, index) => (
                                            <span key={index}>
                                                <a href="#" className="text-gray-900 underline text-sm lg:text-lg font-medium">
                                                    {founder}
                                                </a>
                                                {index < companyDetails[selectedCompany.name].founders.split(', ').length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>


                                <div>
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Category</p>
                                    <p className="text-sm lg:text-lg font-medium">{companyDetails[selectedCompany.name].category}</p>
                                </div>


                                <div className="hidden lg:block">
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Investment Stage</p>
                                    <p className="text-sm lg:text-lg font-medium">{companyDetails[selectedCompany.name].investmentStage}</p>
                                </div>

                                <div className="lg:hidden col-span-2">
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Jungle team</p>
                                    <a href="#" className="text-gray-900 underline text-sm lg:text-lg font-medium">
                                        {companyDetails[selectedCompany.name].jungleTeam}
                                    </a>
                                </div>
                                <div className="lg:hidden col-span-3">
                                    <p className="text-sm lg:text-lg font-medium text-gray-500 mb-1">Investment Stage</p>
                                    <p className="text-sm lg:text-lg font-medium">{companyDetails[selectedCompany.name].investmentStage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartupGrid;