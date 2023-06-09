import { Palette } from "./components/Palette";
import { IProfile } from "./interfaces/api-response";

/*
 * Converts a file to base64
 */
export const toBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/*
 * Returns initial of given name
 */
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
};

/*
 * filter profiles based on name and email
 */
export const search = (profiles: IProfile[], searchMember: string) => {
  const lowercaseSearchMember = searchMember.toLocaleLowerCase();
  return profiles.filter(
    (profile: IProfile) =>
      profile.name.toLowerCase().includes(lowercaseSearchMember) ||
      profile.email.toLowerCase().includes(lowercaseSearchMember)
  );
};

/*
 * Formats the date from YYYY-MM-DD to DD-MM-YYYY
 */
export const formatDate = (date: string) => {
  return date.split("-").reverse().join("/");
};

/*
 * Receives array of profiles and filters depending on given profileId
 */
export const findSelectedMember = (profileId: number, profiles: IProfile[]) => {
  return profiles.filter((user: IProfile) => user.id === profileId)[0];
};

/*
 * Returns corresponding task status colour
 */
export const fetchStatusColor = (status: number) => {
  if (status === 0) {
    return Palette.thGray;
  } else if (status === 1) {
    return Palette.progressBlue;
  } else if (status === 2) {
    return Palette.successGreen;
  } else if (status === 3) {
    return Palette.errorRed;
  } else {
    return "black";
  }
};
