import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({images}) => {
  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={164}>
      {images?.map((image,index) => (
        <ImageListItem key={index}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={'Imagen de la nota'}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
