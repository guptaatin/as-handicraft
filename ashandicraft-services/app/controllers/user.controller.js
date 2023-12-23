const fs = require("fs");
const db = require("../models");
const User = db.users;
const Address = db.addresses;
const Op = db.Sequelize.Op;

// Sample data for states and districts (static)
const statesAndDistricts = {
	"Andaman and Nicobar Islands (UT)": [
		"Nicobars",
		"North And Middle Andaman",
		"South Andamans"
	],
	"Andhra Pradesh": [
		"Alluri Sitharama Raju",
		"Anakapalli",
		"Ananthapuramu",
		"Annamayya",
		"Bapatla",
		"Chittoor",
		"Dr. B.R. Ambedkar Konaseema",
		"East Godavari",
		"Eluru",
		"Guntur",
		"Kakinada",
		"Krishna",
		"Kurnool",
		"Nandyal",
		"Ntr",
		"Palnadu",
		"Parvathipuram Manyam",
		"Prakasam",
		"Sri Potti Sriramulu Nellore",
		"Sri Sathya Sai",
		"Tirupati",
		"Srikakulam",
		"Visakhapatnam",
		"Vizianagaram",
		"West Godavari",
		"YSR Kadapa"
	],
	"Arunachal Pradesh": [
		"Anjaw",
		"Changlang",
		"Dibang Valley",
		"East Kameng",
		"East Siang",
		"Kamle",
		"Kra Daadi",
		"Kurung Kumey",
		"Leparada",
		"Lohit",
		"Longding",
		"Lower Dibang Valley",
		"Lower Siang",
		"Lower Subansiri",
		"Namsai",
		"Pakke Kessang",
		"Papum Pare",
		"Shi Yomi",
		"Siang",
		"Tawang",
		"Tirap",
		"Upper Siang",
		"Upper Subansiri",
		"West Kameng",
		"West Siang"
	],
	"Assam": [
		"Bajali",
		"Baksa",
		"Barpeta",
		"Biswanath",
		"Bongaigaon",
		"Cachar",
		"Charaideo",
		"Chirang",
		"Darrang",
		"Dhemaji",
		"Dhubri",
		"Dibrugarh",
		"Dima Hasao",
		"Goalpara",
		"Golaghat",
		"Hailakandi",
		"Hojai",
		"Jorhat",
		"Kamrup",
		"Kamrup Metropolitan",
		"Karbi Anglong",
		"Karimganj",
		"Kokrajhar",
		"Lakhimpur",
		"Majuli",
		"Marigaon",
		"Nagaon",
		"Nalbari",
		"Sivasagar",
		"Sonitpur",
		"South Salmara-Mankachar",
		"Tamulpur",
		"Tinsukia",
		"Udalguri",
		"West Karbi Anglong"
	],
	"Bihar": [
		"Araria",
		"Arwal",
		"Aurangabad",
		"Banka",
		"Begusarai",
		"Bhagalpur",
		"Bhojpur",
		"Buxar",
		"Darbhanga",
		"Gaya",
		"Gopalganj",
		"Jamui",
		"Jehanabad",
		"Kaimur (Bhabua)",
		"Katihar",
		"Khagaria",
		"Kishanganj",
		"Lakhisarai",
		"Madhepura",
		"Madhubani",
		"Munger (Monghyr)",
		"Muzaffarpur",
		"Nalanda",
		"Nawada",
		"Pashchim Champaran",
		"Patna",
		"Purbi Champaran",
		"Purnia (Purnea)",
		"Rohtas",
		"Saharsa",
		"Samastipur",
		"Saran",
		"Sheikhpura",
		"Sheohar",
		"Sitamarhi",
		"Siwan",
		"Supaul",
		"Vaishali"
	],
	"Chandigarh (UT)": [
		"Chandigarh"
	],
	"Chhattisgarh": [
		"Balod",
		"Balodabazar-Bhatapara",
		"Balrampur Ramanujganj",
		"Bastar",
		"Bemetara",
		"Bijapur",
		"Bilaspur",
		"Dakshin Bastar Dantewada",
		"Dhamtari",
		"Durg",
		"Gariyaband",
		"Gaurela Pendra Marwahi",
		"Janjgir-Champa",
		"Jashpur",
		"Kabeerdham (Kawardha)",
		"Khairagarh Chhuikhadan Gandai",
		"Kondagaon",
		"Korba",
		"Korea (Koriya)",
		"Mahasamund",
		"Manendragarh Chirmiri Bharatpur Mcb",
		"Mohla Manpur Ambagarh Chouki",
		"Mungeli",
		"Narayanpur",
		"Raigarh",
		"Raipur",
		"Rajnandgaon",
		"Sakti",
		"Sarangarh Bilaigarh",
		"Sukma",
		"Surajpur",
		"Surguja",
		"Uttar Bastar Kanker"
	],
	"Dadra and Nagar Haveli and Daman and Diu (UT)": [
		"Dadra & Nagar Haveli",
		"Daman",
		"Diu"
	],
	"Delhi (NCT)": [
		"Central Delhi",
		"East Delhi",
		"New Delhi",
		"North Delhi",
		"North East Delhi",
		"North West Delhi",
		"Shahdara",
		"South Delhi",
		"South East Delhi",
		"South West  Delhi",
		"West Delhi"
	],
	"Goa": [
		"North Goa",
		"South Goa"
	],
	"Gujarat": [
		"Ahmedabad",
		"Amreli",
		"Anand",
		"Aravalli",
		"Banaskantha (Palanpur)",
		"Bharuch",
		"Bhavnagar",
		"Botad",
		"Chhota Udepur",
		"Dahod",
		"Dangs (Ahwa)",
		"Devbhoomi Dwarka",
		"Gandhinagar",
		"Gir Somnath",
		"Jamnagar",
		"Junagadh",
		"Kachchh",
		"Kheda (Nadiad)",
		"Mahisagar",
		"Mehsana",
		"Morbi",
		"Narmada (Rajpipla)",
		"Navsari",
		"Panchmahal (Godhra)",
		"Patan",
		"Porbandar",
		"Rajkot",
		"Sabarkantha (Himmatnagar)",
		"Surat",
		"Surendranagar",
		"Tapi (Vyara)",
		"Vadodara",
		"Valsad"
	],
	"Haryana": [
		"Ambala",
		"Bhiwani",
		"Charkhi Dadri",
		"Faridabad",
		"Fatehabad",
		"Gurgaon",
		"Hisar",
		"Jhajjar",
		"Jind",
		"Kaithal",
		"Karnal",
		"Kurukshetra",
		"Mahendragarh",
		"Nuh",
		"Palwal",
		"Panchkula",
		"Panipat",
		"Rewari",
		"Rohtak",
		"Sirsa",
		"Sonipat",
		"Yamunanagar"
	],
	"Himachal Pradesh": [
		"Bilaspur",
		"Chamba",
		"Hamirpur",
		"Kangra",
		"Kinnaur",
		"Kullu",
		"Lahaul And Spiti",
		"Mandi",
		"Shimla",
		"Sirmaur (Sirmour)",
		"Solan",
		"Una"
	],
	"Jammu and Kashmir (UT)": [
		"Anantnag",
		"Bandipore",
		"Baramulla",
		"Budgam",
		"Doda",
		"Ganderbal",
		"Jammu",
		"Kathua",
		"Kishtwar",
		"Kulgam",
		"Kupwara",
		"Poonch",
		"Pulwama",
		"Rajouri",
		"Ramban",
		"Reasi",
		"Samba",
		"Shopian",
		"Srinagar",
		"Udhampur"
	],
	"Jharkhand": [
		"Bokaro",
		"Chatra",
		"Deoghar",
		"Dhanbad",
		"Dumka",
		"East Singhbhum",
		"Garhwa",
		"Giridih",
		"Godda",
		"Gumla",
		"Hazaribag",
		"Jamtara",
		"Khunti",
		"Koderma",
		"Latehar",
		"Lohardaga",
		"Pakur",
		"Palamu",
		"Ramgarh",
		"Ranchi",
		"Sahibganj",
		"Seraikela-Kharsawan",
		"Simdega",
		"West Singhbhum"
	],
	"Karnataka": [
		"Bagalkot",
		"Ballari (Bellary)",
		"Belagavi (Belgaum)",
		"Bengaluru (Bangalore) Rural",
		"Bengaluru (Bangalore) Urban",
		"Bidar",
		"Chamarajanagar",
		"Chikballapur",
		"Chikkamagaluru (Chikmagalur)",
		"Chitradurga",
		"Dakshina Kannada",
		"Davangere",
		"Dharwad",
		"Gadag",
		"Hassan",
		"Haveri",
		"Kalaburagi (Gulbarga)",
		"Kodagu",
		"Kolar",
		"Koppal",
		"Mandya",
		"Mysuru (Mysore)",
		"Raichur",
		"Ramanagara",
		"Shivamogga (Shimoga)",
		"Tumakuru (Tumkur)",
		"Udupi",
		"Uttara Kannada (Karwar)",
		"Vijayanagar",
		"Vijayapura (Bijapur)",
		"Yadgir"
	],
	"Kerala": [
		"Alappuzha",
		"Ernakulam",
		"Idukki",
		"Kannur",
		"Kasaragod",
		"Kollam",
		"Kottayam",
		"Kozhikode",
		"Malappuram",
		"Palakkad",
		"Pathanamthitta",
		"Thiruvananthapuram",
		"Thrissur",
		"Wayanad"
	],
	"Ladakh (UT)": [
		"Kargil",
		"Leh Ladakh"
	],
	"Lakshadweep (UT)": [
		"Lakshadweep District"
	],
	"Madhya Pradesh": [
		"Agar Malwa",
		"Alirajpur",
		"Anuppur",
		"Ashoknagar",
		"Balaghat",
		"Barwani",
		"Betul",
		"Bhind",
		"Bhopal",
		"Burhanpur",
		"Chhatarpur",
		"Chhindwara",
		"Damoh",
		"Datia",
		"Dewas",
		"Dhar",
		"Dindori",
		"Guna",
		"Gwalior",
		"Harda",
		"Indore",
		"Jabalpur",
		"Jhabua",
		"Katni",
		"Khandwa",
		"Khargone",
		"Mauganj",
		"Maihar",
		"Mandla",
		"Mandsaur",
		"Morena",
		"Narmadapuram",
		"Narsinghpur",
		"Neemuch",
		"Niwari",
		"Pandhurna",
		"Panna",
		"Raisen",
		"Rajgarh",
		"Ratlam",
		"Rewa",
		"Sagar",
		"Satna",
		"Sehore",
		"Seoni",
		"Shahdol",
		"Shajapur",
		"Sheopur",
		"Shivpuri",
		"Sidhi",
		"Singrauli",
		"Tikamgarh",
		"Ujjain",
		"Umaria",
		"Vidisha"
	],
	"Maharashtra": [
		"Ahmednagar",
		"Akola",
		"Amravati",
		"Beed",
		"Bhandara",
		"Buldhana",
		"Chandrapur",
		"Chhatrapati Sambhajinagar",
		"Dharashiv",
		"Dhule",
		"Gadchiroli",
		"Gondia",
		"Hingoli",
		"Jalgaon",
		"Jalna",
		"Kolhapur",
		"Latur",
		"Mumbai City",
		"Mumbai Suburban",
		"Nagpur",
		"Nanded",
		"Nandurbar",
		"Nashik",
		"Palghar",
		"Parbhani",
		"Pune",
		"Raigad",
		"Ratnagiri",
		"Sangli",
		"Satara",
		"Sindhudurg",
		"Solapur",
		"Thane",
		"Wardha",
		"Washim",
		"Yavatmal"
	],
	"Manipur": [
		"Bishnupur",
		"Chandel",
		"Churachandpur",
		"Imphal East",
		"Imphal West",
		"Jiribam",
		"Kakching",
		"Kamjong",
		"Kangpokpi",
		"Noney",
		"Pherzawl",
		"Senapati",
		"Tamenglong",
		"Tengnoupal",
		"Thoubal",
		"Ukhrul"
	],
	"Meghalaya": [
		"East Garo Hills",
		"East Jaintia Hills",
		"East Khasi Hills",
		"Eastern West Khasi Hills",
		"North Garo Hills",
		"Ri Bhoi",
		"South Garo Hills",
		"South West Garo Hills ",
		"South West Khasi Hills",
		"West Garo Hills",
		"West Jaintia Hills",
		"West Khasi Hills"
	],
	"Mizoram": [
		"Aizawl",
		"Champhai",
		"Hnahthial",
		"Khawzawl",
		"Kolasib",
		"Lawngtlai",
		"Lunglei",
		"Mamit",
		"Saitual",
		"Saiha",
		"Serchhip"
	],
	"Nagaland": [
		"Chumoukedima",
		"Dimapur",
		"Kiphire",
		"Kohima",
		"Longleng",
		"Mokokchung",
		"Mon",
		"Niuland",
		"Noklak",
		"Peren",
		"Phek",
		"Shamator",
		"Tseminyu",
		"Tuensang",
		"Wokha",
		"Zunheboto"
	],
	"Odisha": [
		"Angul",
		"Balangir",
		"Balasore",
		"Bargarh",
		"Bhadrak",
		"Boudh",
		"Cuttack",
		"Deogarh",
		"Dhenkanal",
		"Gajapati",
		"Ganjam",
		"Jagatsinghapur",
		"Jajpur",
		"Jharsuguda",
		"Kalahandi",
		"Kandhamal",
		"Kendrapara",
		"Kendujhar (Keonjhar)",
		"Khordha",
		"Koraput",
		"Malkangiri",
		"Mayurbhanj",
		"Nabarangpur",
		"Nayagarh",
		"Nuapada",
		"Puri",
		"Rayagada",
		"Sambalpur",
		"Sonepur",
		"Sundargarh"
	],
	"Puducherry (UT)": [
		"Karaikal",
		"Mahe",
		"Pondicherry",
		"Yanam"
	],
	"Punjab": [
		"Amritsar",
		"Barnala",
		"Bathinda",
		"Faridkot",
		"Fatehgarh Sahib",
		"Fazilka",
		"Ferozepur",
		"Gurdaspur",
		"Hoshiarpur",
		"Jalandhar",
		"Kapurthala",
		"Ludhiana",
		"Malerkotla",
		"Mansa",
		"Moga",
		"Pathankot",
		"Patiala",
		"Rupnagar",
		"Sahibzada Ajit Singh Nagar (Mohali)",
		"Sangrur",
		"Shahid Bhagat Singh Nagar",
		"Sri Muktsar Sahib",
		"Tarn Taran"
	],
	"Rajasthan": [
		"Ajmer",
		"Alwar",
		"Anoopgarh",
		"Balotra",
		"Banswara",
		"Baran",
		"Barmer",
		"Beawar",
		"Bharatpur",
		"Bhilwara",
		"Bikaner",
		"Bundi",
		"Chittorgarh",
		"Churu",
		"Dausa",
		"Deeg",
		"Dholpur",
		"Didwana Kuchaman",
		"Dudu",
		"Dungarpur",
		"Ganganagar",
		"Gangapurcity",
		"Hanumangarh",
		"Jaipur",
		"Jaipur Gramin",
		"Jaisalmer",
		"Jalore",
		"Jhalawar",
		"Jhunjhunu",
		"Jodhpur",
		"Jodhpur Gramin",
		"Karauli",
		"Kekri",
		"Khairthal-Tijara",
		"Kota",
		"Kotputli-Behror",
		"Nagaur",
		"Neem Ka Thana",
		"Pali",
		"Phalodi",
		"Pratapgarh",
		"Rajsamand",
		"Salumbar",
		"Sanchor",
		"Sawai Madhopur",
		"Shahpura",
		"Sikar",
		"Sirohi",
		"Tonk",
		"Udaipur"
	],
	"Sikkim": [
		"Gangtok",
		"Gyalshing",
		"Mangan",
		"Namchi",
		"Pakyong",
		"Soreng"
	],
	"Tamil Nadu": [
		"Ariyalur",
		"Chengalpattu",
		"Chennai",
		"Coimbatore",
		"Cuddalore",
		"Dharmapuri",
		"Dindigul",
		"Erode",
		"Kallakurichi",
		"Kanchipuram",
		"Kanyakumari",
		"Karur",
		"Krishnagiri",
		"Madurai",
		"Mayiladuthurai",
		"Nagapattinam",
		"Namakkal",
		"Perambalur",
		"Pudukkottai",
		"Ramanathapuram",
		"Ranipet",
		"Salem",
		"Sivaganga",
		"Tenkasi",
		"Thanjavur",
		"The Nilgiris",
		"Theni",
		"Thiruvallur",
		"Thiruvarur",
		"Tiruchirappalli",
		"Tirunelveli",
		"Tirupathur",
		"Tiruppur",
		"Tiruvannamalai",
		"Tuticorin",
		"Vellore",
		"Viluppuram",
		"Virudhunagar"
	],
	"Telangana": [
		"Adilabad",
		"Bhadradri Kothagudem",
		"Hanumakonda",
		"Hyderabad",
		"Jagtial",
		"Jangaon",
		"Jayashankar Bhoopalpally",
		"Jogulamba Gadwal",
		"Kamareddy",
		"Karimnagar",
		"Khammam",
		"Komaram Bheem Asifabad",
		"Mahabubabad",
		"Mahabubnagar",
		"Mancherial",
		"Medak",
		"Medchal",
		"Mulugu",
		"Nagarkurnool",
		"Nalgonda",
		"Narayanpet",
		"Nirmal",
		"Nizamabad",
		"Peddapalli",
		"Rajanna Sircilla",
		"Rangareddy",
		"Sangareddy",
		"Siddipet",
		"Suryapet",
		"Vikarabad",
		"Wanaparthy",
		"Warangal",
		"Yadadri Bhuvanagiri"
	],
	"Tripura": [
		"Dhalai",
		"Gomati",
		"Khowai",
		"North Tripura",
		"Sepahijala",
		"South Tripura",
		"Unakoti",
		"West Tripura"
	],
	"Uttar Pradesh": [
		"Agra",
		"Aligarh",
		"Ambedkar Nagar",
		"Amethi (Chatrapati Sahuji Mahraj Nagar)",
		"Amroha (J.P. Nagar)",
		"Auraiya",
		"Ayodhya",
		"Azamgarh",
		"Baghpat",
		"Bahraich",
		"Ballia",
		"Balrampur",
		"Banda",
		"Barabanki",
		"Bareilly",
		"Basti",
		"Bhadohi",
		"Bijnor",
		"Budaun",
		"Bulandshahr",
		"Chandauli",
		"Chitrakoot",
		"Deoria",
		"Etah",
		"Etawah",
		"Faizabad",
		"Farrukhabad",
		"Fatehpur",
		"Firozabad",
		"Gautam Buddha Nagar",
		"Ghaziabad",
		"Ghazipur",
		"Gonda",
		"Gorakhpur",
		"Hamirpur",
		"Hapur (Panchsheel Nagar)",
		"Hardoi",
		"Hathras",
		"Jalaun",
		"Jaunpur",
		"Jhansi",
		"Kannauj",
		"Kanpur Dehat",
		"Kanpur Nagar",
		"Kasganj",
		"Kaushambi",
		"Kheri",
		"Kushinagar (Padrauna)",
		"Lalitpur",
		"Lucknow",
		"Maharajganj",
		"Mahoba",
		"Mainpuri",
		"Mathura",
		"Mau",
		"Meerut",
		"Mirzapur",
		"Moradabad",
		"Muzaffarnagar",
		"Pilibhit",
		"Pratapgarh",
		"Prayagraj",
		"RaeBareli",
		"Rampur",
		"Saharanpur",
		"Sambhal (Bhim Nagar)",
		"Sant Kabir Nagar",
		"Shahjahanpur",
		"Shamali (Prabuddh Nagar)",
		"Shravasti",
		"Siddharth Nagar",
		"Sitapur",
		"Sonbhadra",
		"Sultanpur",
		"Unnao",
		"Varanasi"
	],
	"Uttarakhand": [
		"Almora",
		"Bageshwar",
		"Chamoli",
		"Champawat",
		"Dehradun",
		"Haridwar",
		"Nainital",
		"Pauri Garhwal",
		"Pithoragarh",
		"Rudraprayag",
		"Tehri Garhwal",
		"Udham Singh Nagar",
		"Uttarkashi"
	],
	"West Bengal": [
		"Alipurduar",
		"Bankura",
		"Birbhum",
		"Cooch Behar",
		"Dakshin Dinajpur (South Dinajpur)",
		"Darjeeling",
		"Hooghly",
		"Howrah",
		"Jalpaiguri",
		"Jhargram",
		"Kalimpong",
		"Kolkata",
		"Malda",
		"Murshidabad",
		"Nadia",
		"North 24 Parganas",
		"Paschim Bardhaman",
		"Paschim Medinipur (West Medinipur)",
		"Purba Bardhaman",
		"Purba Medinipur (East Medinipur)",
		"Purulia",
		"South 24 Parganas",
		"Uttar Dinajpur (North Dinajpur)"
	]
};

// get all states
exports.states = (req, res) => {
	const states = Object.keys(statesAndDistricts);
	res.json(states);
};

// get districts for a specific state
exports.districts = (req, res) => {
	const { state } = req.params;
	const districts = statesAndDistricts[state] || [];
	res.json(districts);
};

// Update Profile Image User
exports.updateProfileImage = (req, res) => {
	try {
		console.log(req.file, req.query);
		const UserId = req.query.userId;
		// Validate request
		if (!req.file) {
			return res.send(`You must select a file.`);
		}

		let user_profile;

		if (req.query.profile_type === 'cover') {
			user_profile = User.update({
				cover_type: req.file.mimetype,
				cover_name: req.file.originalname,
				cover_data: fs.readFileSync(
					__basedir + "/resources/static/assets/uploads/" + req.file.filename
				),
			}, { where: { id: UserId } });
		} else {
			user_profile = User.update({
				type: req.file.mimetype,
				name: req.file.originalname,
				data: fs.readFileSync(
					__basedir + "/resources/static/assets/uploads/" + req.file.filename
				),
			}, { where: { id: UserId } });
		}

		user_profile.then((image) => {
			User.findByPk(UserId)
				.then(data => {
					if (data) {
						res.send(data);
					} else {
						res.status(404).send({
							message: `Cannot find User with UserId=${UserId}.`
						});
					}
				})
				.catch(err => {
					res.status(500).send({
						message: "Error retrieving User with UserId=" + UserId
					});
				});
		});
	} catch (error) {
		console.log(error);
		return res.send(`Error when trying upload images: ${error}`);
	}
};

exports.createUserAddress = async (req, res) => {
	try {
		const { userId } = req.query;
		const user = await User.findByPk(userId, { include: Address });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		Address.create({
			recipient_name: req.body.recipient_name,
			recipient_email: req.body.recipient_email,
			alt_mobile: req.body.alt_mobile,
			house: req.body.house,
			street: req.body.street,
			landmark: req.body.landmark,
			city: req.body.city,
			pincode: req.body.pincode,
			state: req.body.state,
			district: req.body.district,
			save_as: req.body.save_as,
			userId: userId
		}).then((data) => {
			console.log(data);
			User.findByPk(userId, { include: Address })
				.then(data => {
					if (data) {
						res.send(data);
					} else {
						res.status(404).send({
							message: `Cannot find User with userId=${userId}.`
						});
					}
				})
				.catch(err => {
					res.status(500).send({
						message: "Error retrieving User with userId=" + userId
					});
				});
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}


	// try {
	// 	const { userId } = req.query; // Get the user ID from request parameters
	// 	const user = await User.findByPk(userId, { include: Address }); // Find the user with associated addresses

	// 	if (!user) {
	// 		return res.status(404).json({ message: 'User not found' });
	// 	}

	// 	const { addresses } = req.body; // Get addresses from request body

	// 	// Check if addresses array exists and has at least one item
	// 	if (Array.isArray(addresses) && addresses.length > 0) {
	// 		const existingAddressIds = user.addresses.map((address) => address.id); // Get IDs of existing addresses

	// 		const promises = addresses.map(async (addressObj) => {
	// 			if (addressObj.id && existingAddressIds.includes(addressObj.id)) {
	// 				// If the address object has an ID and it exists in the user's addresses, update the existing address
	// 				const existingAddress = user.addresses.find((address) => address.id === addressObj.id);
	// 				await existingAddress.update(addressObj);
	// 			} else {
	// 				// If the address object doesn't have an ID or it's not in the existing addresses, create a new address
	// 				const {
	// 					recipient_name,
	// 					recipient_email,
	// 					alt_mobile,
	// 					house,
	// 					street,
	// 					landmark,
	// 					city,
	// 					pincode,
	// 					state,
	// 					district,
	// 					save_as,
	// 				} = addressObj;
	// 				await Address.create({
	// 					recipient_name,
	// 					recipient_email,
	// 					alt_mobile,
	// 					house, street, landmark, city, pincode,
	// 					state,
	// 					district,
	// 					save_as, userId: userId
	// 				});
	// 			}
	// 		});

	// 		await Promise.all(promises);

	// 		// Remove addresses that are not included in the request body
	// 		const addressesToRemove = user.addresses.filter(
	// 			(address) => !addresses.some((addressObj) => addressObj.id === address.id)
	// 		);

	// 		const removePromises = addressesToRemove.map(async (address) => {
	// 			await address.destroy();
	// 		});

	// 		await Promise.all(removePromises);
	// 	} else {
	// 		// If no addresses are provided in the request body, remove all existing addresses for the user
	// 		// const removePromises = user.addresses.map(async (address) => {
	// 		// 	console.log("sdf--->", address);
	// 		// 	await address.destroy();
	// 		// });

	// 		// await Promise.all(removePromises);
	// 		Address.destroy({
	// 			where: {},
	// 			truncate: false
	// 		})
	// 			.then(data => {
	// 				console.log(data);
	// 			})
	// 			.catch(err => {
	// 				res.status(500).send({
	// 					message:
	// 						err.message || "Some error occurred while removing all Users."
	// 				});
	// 			});
	// 	}

	// 	res.json({ message: 'Addresses managed successfully' });
	// } catch (error) {
	// 	console.error(error);
	// 	res.status(500).json({ message: 'Server error' });
	// }
};

exports.findUserAddresses = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findByPk(userId, { include: Address });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.findAll = (req, res) => {
	const Mobile = req.query.Mobile;
	var condition = Mobile ? { Mobile: { [Op.like]: `%${Mobile}%` } } : null;
	User.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving users."
			});
		});
};

exports.findOneUser = (req, res) => {
	const userId = req.params.userId;
	User.findByPk(userId, { include: Address })
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find User with userId=${userId}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving User with userId=" + userId
			});
		});
};

exports.updateUser = async (req, res) => {
	const UserId = req.params.UserId;
	const user = await User.findByPk(UserId);
	const user_data = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobile: req.body.mobile,
		prefixMobile: req.body.prefixMobile,
		gender: req.body.gender,
		dateOfBirth: req.body.dateOfBirth
	};
	User.update(user_data, {
		where: { id: UserId }
	})
		.then(data => {
			res.status(200).send(user);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating User with UserId=" + UserId
			});
		});
};

exports.delete = (req, res) => {
	const UserId = req.params.UserId;
	User.destroy({
		where: { UserId: UserId }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "User was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete User with UserId=${UserId}. Maybe User was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete User with UserId=" + UserId
			});
		});
};

exports.deleteAll = (req, res) => {
	User.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Users were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Users."
			});
		});
};

exports.findAllMobileVerified = (req, res) => {
	Tutorial.findAll({ where: { published: true } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

exports.vendorBoard = (req, res) => {
	res.status(200).send("Vendor Content.");
};