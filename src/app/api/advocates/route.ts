import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData as seedData } from "../../../db/seed/advocates";

export async function GET() {
	// Uncomment this line to use a database
	const dbData = await db.select().from(advocates);

	// const data = seedData;

	return Response.json({ data: dbData });
}
