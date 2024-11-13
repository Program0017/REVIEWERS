const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	// Create user tags
	const foodieTag = await prisma.userTag.create({
		data: { tag: 'Foodie' },
	});
	const coffeeLoverTag = await prisma.userTag.create({
		data: { tag: 'Coffee Lover' },
	});

	// Create business tags
	const chineseTag = await prisma.businessTag.create({
		data: { tag: 'Chinese' },
	});
	const cafeTag = await prisma.businessTag.create({
		data: { tag: 'Café' },
	});

	// Business Categories
	const businessesCategories = await prisma.businessCategory.createMany({
		data: [
			{ category: 'Restaurant' },
			{ category: 'Café' },
			{ category: 'Gym' },
			{ category: 'Retail' },
			{ category: 'Beauty Salon' },
			{ category: 'Entertainment' },
		],
		skipDuplicates: true,
	});

	// Find the Restaurant and Café categories
	const restaurantCategory = await prisma.businessCategory.findFirst({
		where: { category: 'Restaurant' },
	});

	const cafeCategory = await prisma.businessCategory.findFirst({
		where: { category: 'Café' },
	});

	// Reward Categories
	const rewardCategories = await prisma.rewardCategory.createMany({
		data: [
			{ category: 'Hotel discount' },
			{ category: 'Food discount' },
			{ category: 'Gym discount' },
			{ category: 'Car rental discount' },
			{ category: 'Furniture discount' },
			{ category: 'Technology discount' },
		],
		skipDuplicates: true,
	});


	const HotelDiscountCategory = await prisma.rewardCategory.findFirst({
		where: { category: 'Hotel discount' },
	});

	const FoodDiscountCategory = await prisma.rewardCategory.findFirst({
		where: { category: 'Food discount' },
	});

	const reward1 = await prisma.reward.create({
		data: {
		  pointsNeeded: 15,
		  description: '20% Discount on Next Purchase',
		  expirationDate: new Date('2024-12-12'),
		  categoryId: HotelDiscountCategory.id,
		},
	  });
	  
	  const reward2 = await prisma.reward.create({
		data: {
		  pointsNeeded: 15,
		  description: '20% Discount on Next Purchase',
		  expirationDate: new Date('2024-12-12'),
		  categoryId: HotelDiscountCategory.id,
		},
	  });
	  
	  const reward3 = await prisma.reward.create({
		data: {
		  pointsNeeded: 15,
		  description: '20% Discount on Next Purchase',
		  expirationDate: new Date('2024-12-12'),
		  categoryId: FoodDiscountCategory.id,
		},
	  });
	  
	  const reward4 = await prisma.reward.create({
		data: {
		  pointsNeeded: 15,
		  description: '20% Discount on Next Purchase',
		  expirationDate: new Date('2024-12-12'),
		  categoryId: FoodDiscountCategory.id,
		},
	  });
	  
	  const reward5 = await prisma.reward.create({
		data: {
		  pointsNeeded: 15,
		  description: '20% Discount on Next Purchase',
		  expirationDate: new Date('2024-12-12'),
		  categoryId: FoodDiscountCategory.id,
		},
	  });
	  


	// Create unique businesses
	const business1 = await prisma.business.create({
		data: {
			name: 'La Buena Mesa',
			location: '123 Calle Principal',
			categoryId: restaurantCategory.id,
			contactInfo: 'contacto@labuenamesa.com',
		},
	});

	const business2 = await prisma.business.create({
		data: {
			name: 'El Sazón Gourmet',
			location: '456 Avenida del Sol',
			categoryId: restaurantCategory.id,
			contactInfo: 'info@elsazongourmet.com',
		},
	});

	const business3 = await prisma.business.create({
		data: {
			name: 'Café Central',
			location: '789 Calle del Café',
			categoryId: cafeCategory.id,
			contactInfo: 'contacto@cafecentral.com',
		},
	});

	const business4 = await prisma.business.create({
		data: {
			name: 'Café Aromas',
			location: '321 Avenida Aroma',
			categoryId: cafeCategory.id,
			contactInfo: 'info@cafearomas.com',
		},
	});

	const business5 = await prisma.business.create({
		data: {
			name: 'Restaurante La Delicia',
			location: '654 Calle Sabores',
			categoryId: restaurantCategory.id,
			contactInfo: 'info@ladelicia.com',
		},
	});

	// Assign tags to businesses
	await prisma.business.update({
		where: { id: business1.id },
		data: {
			tags: {
				connect: { id: chineseTag.id },
			},
		},
	});

	await prisma.business.update({
		where: { id: business3.id },
		data: {
			tags: {
				connect: { id: cafeTag.id },
			},
		},
	});
	
	// Create unique users
	const user1 = await prisma.user.create({
		data: {
			username: 'UserTest1',
			email: 'user1@example.com',
			passwordHash: 'hashedpassword1',
			bio: 'User bio 1',
			profilePictureUrl: 'https://example.com/user1.jpg',
			referredById: null,
		},
	});

	const user2 = await prisma.user.create({
		data: {
			username: 'UserTest2',
			email: 'user2@example.com',
			passwordHash: 'hashedpassword2',
			profilePictureUrl: 'https://example.com/user2.jpg',
			bio: 'User bio 2',
			referredById: user1.id,
		},
	});

	const user3 = await prisma.user.create({
		data: {
			username: 'UserTest3',
			email: 'user3@example.com',
			passwordHash: 'hashedpassword3',
			profilePictureUrl: 'https://example.com/user3.jpg',
			bio: 'User bio 3',
			referredById: user2.id,
		},
	});

	const user4 = await prisma.user.create({
		data: {
			username: 'UserTest4',
			email: 'user4@example.com',
			passwordHash: 'hashedpassword4',
			profilePictureUrl: 'https://example.com/user4.jpg',
			bio: 'User bio 4',
			referredById: user1.id,
		},
	});

	const user5 = await prisma.user.create({
		data: {
			username: 'UserTest5',
			email: 'user5@example.com',
			passwordHash: 'hashedpassword5',
			profilePictureUrl: 'https://example.com/user5.jpg',
			bio: 'User bio 5',
			referredById: user2.id,
		},
	});

	// Assign tags to users
	await prisma.user.update({
		where: { id: user1.id },
		data: {
			tags: {
				connect: { id: foodieTag.id },
			},
		},
	});

	await prisma.user.update({
		where: { id: user2.id },
		data: {
			tags: {
				connect: { id: coffeeLoverTag.id },
			},
		},
	});

	// Create reviews with unique data
	await prisma.review.createMany({
		data: [
			{
				userId: user1.id,
				businessId: business1.id,
				rating: 5,
				title: "Excellent Restaurant!",
				content: "The food was fantastic and the ambiance was perfect. Highly recommend it!",
				imageUrl: "https://example.com/restaurant1.jpg",
				tags: "food,service,ambiance",
				isValidated: false
			},
			{
				userId: user2.id,
				businessId: business2.id,
				rating: 4,
				title: "Great, but a bit pricey",
				content: "The food was delicious, but the prices were a bit high for what was offered.",
				imageUrl: "https://example.com/restaurant2.jpg",
				tags: "food,price",
				isValidated: false

			},
			{
				userId: user3.id,
				businessId: business3.id,
				rating: 3,
				title: "Average café",
				content: "The coffee was okay, but the service could have been faster.",
				imageUrl: "https://example.com/cafe1.jpg",
				tags: "coffee,service",
				isValidated: false

			},
			{
				userId: user4.id,
				businessId: business4.id,
				rating: 5,
				title: "Best Café in town!",
				content: "Amazing coffee and great atmosphere. Will definitely come back!",
				imageUrl: "https://example.com/cafe2.jpg",
				tags: "coffee,atmosphere",
				isValidated: false

			},
			{
				userId: user5.id,
				businessId: business5.id,
				rating: 2,
				title: "Disappointing experience",
				content: "The food was cold, and the service was slow. Would not recommend.",
				imageUrl: "https://example.com/restaurant3.jpg",
				tags: "food,service,slow",
				isValidated: false

			},
		],
	});


	// Create user tags
	await prisma.userTag.createMany({
		data: [
			{ tag: 'Foodie' },
			{ tag: 'Travel Enthusiast' },
			{ tag: 'Coffee Lover' },
			{ tag: 'Fitness Junkie' },
			{ tag: 'Music Buff' },
		],
	});

	// Create business tags
	await prisma.businessTag.createMany({
		data: [
			{ tag: 'Chinese' },
			{ tag: 'Café' },
			{ tag: 'Gym' },
			{ tag: 'Retail' },
			{ tag: 'Entertainment' },
		],
	});


	console.log('Seed data has been successfully inserted!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
