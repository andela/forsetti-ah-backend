import cloudinary from 'cloudinary';
import db from '../../models';

const { Article } = db;

const deleteImage = async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne({
    attributes: ['image'],
    where: {
      slug,
    }
  });
  const imageUrl = article.dataValues.image;
  if (!imageUrl) return next();
  const secureImageId = imageUrl.slice(70, 90);
  cloudinary.v2.uploader.destroy(secureImageId);
  return next();
};

export default deleteImage;
