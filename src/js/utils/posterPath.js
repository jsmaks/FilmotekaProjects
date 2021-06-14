import options from '../setting';
const { IMG_URL } = options;
import notImg from '/images/noImageAvailable.png';

export const getPosterPath = imageName => {
  if (!imageName) {
    return (imageName = `${notImg}`);
  }
  return `${IMG_URL}${imageName}`;
};

