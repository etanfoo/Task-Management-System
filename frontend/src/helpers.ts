import { IProfile } from "./interfaces/api-response";

// todo: check file type
export const toBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getInitials = (name: string) => {
  if (name === "") {
    return null;
  }

  let names = name.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}

export const search = (profiles: IProfile[], searchMember: string) => {
  return profiles.filter((profile: IProfile) => 
    profile.name.toLowerCase().includes(searchMember) || profile.email.toLowerCase().includes(searchMember));
}
