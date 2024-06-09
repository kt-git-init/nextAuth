import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  const userid = await getDataFromToken(request);

  const user = await User.findOne({ _id: userid }).select("-password");

  return NextResponse.json({
    message: "User fetched successfully",
    data: user,
  });
}
