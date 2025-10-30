import User from "../models/user.model";
import { connectDB } from "../mongodb/mongodb";

type User = {
  id: string;
  email_addresses: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  username: string | null;
};

export async function createOrUpdateUser({
  id,
  email_addresses,
  first_name,
  last_name,
  image_url,
  username,
}: User) {
  try {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email:  email_addresses[0].email_address,
          username: username,
        },
      },
      { new: true, upsert: true }
    );
    return user ;
  } catch (error) {
    console.log('Error creating or updating user', error)
  }
}

export async function deleteUser(id:{id: string}){
    try {
        await connectDB()
        User.deleteOne({clerkId: id})
    } catch (error) {
        console.log('error deleting user', error)
    }
}
