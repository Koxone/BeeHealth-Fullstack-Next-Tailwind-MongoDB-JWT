/* --- Service: getInventory --- */
/* Sends a GET request to /api/inventory to retrieve the inventory list */

export async function getInventory() {
  try {
    const res = await fetch('/api/inventory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Error fetching inventory data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Fetch inventory request completed');
  }
}
