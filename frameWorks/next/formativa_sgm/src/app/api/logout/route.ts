//rota para logout 

import { NextResponse } from "next/server";

export async function POST() {
    // remove o token do cliente
    return NextResponse(JSON.stringify(
        {success: true},{status: 204}
    ));
}