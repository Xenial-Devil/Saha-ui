import "./App.css";
import Carousel from "./components/Carousel";
import CarouseItem from "./components/Carousel/CarouseImage";
import { CarouseItemProps } from "./components/Carousel/CarouselProps";

function App() {
  // const imagelist = [
  //   "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg",
  //   "https://cdn.pixabay.com/photo/2021/07/06/19/26/drops-6392473_960_720.jpg",
  //   "https://cdn.pixabay.com/photo/2024/01/02/14/58/leaf-8483401_960_720.jpg",
  //   "https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_960_720.jpg",
  //   "https://cdn.pixabay.com/photo/2018/01/05/02/50/boat-3062045_960_720.jpg",
  // ];
  const images: CarouseItemProps[] = [
    {
      image:
        "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg",
      alt: "Sample Image 1",
      caption: "This is the first image",
      title: "Image 1 Title",
      description: "Description for the first image",
      link: "https://example.com/link1",
      linkText: "Go",
      linkTarget: "_blank",
      className: "image-class",
      captionStyle: {},
      titleStyle: {},
      linkStyle: {},
      onClick: () => {
        alert("Click");
      },
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2021/07/06/19/26/drops-6392473_960_720.jpg",
      alt: "Sample Image 2",
      caption: "This is the second image",
      title: "Image 2 Title",
      description: "Description for the second image",
      link: "https://example.com/link2",
      linkTarget: "_self",
      className: "image-class-secondary",
      captionStyle: {},
      titleStyle: {},
      linkStyle: {},
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2024/01/02/14/58/leaf-8483401_960_720.jpg",
      alt: "Sample Image 3",
      caption: "This is the third image",
      title: "Image 3 Title",
      description: "Description for the third image",
      link: "https://example.com/link3",
      linkTarget: "_top",
      className: "image-class-tertiary",
      captionStyle: {},
      titleStyle: {},
      linkStyle: {},
    },
  ];

  return (
    <>
      <Carousel>
        {images.map((image, index) => (
          <CarouseItem key={index} {...image} />
        ))}
      </Carousel>
    </>
  );
}

export default App;
