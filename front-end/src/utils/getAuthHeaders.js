// Retrieves firebase user token and then sends it to backend. The backend middleware will then verify it

import { auth } from "../firebase";

export default async function getAuthHeaders() {
  const token = await auth.currentUser.getIdToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
