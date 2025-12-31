export async function hashStringSHA256(message: string) {
  // Encode the string as a Uint8Array (UTF-8 is standard)
  const msgBuffer = new TextEncoder().encode(message); 
  
  // Hash the message using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); 
  
  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  
  return hashHex;
}
