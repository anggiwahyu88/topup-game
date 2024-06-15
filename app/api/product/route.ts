import { getAllProduct } from "@/utils/api/service";
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const response = await getAllProduct()
    return NextResponse.json(response);
}