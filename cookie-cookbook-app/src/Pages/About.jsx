import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function AboutPage() {
    const [index, setIndex] = useState(0);
        
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    
    return (
            <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <Carousel.Caption>
                <h3>About Cookie Cookbook</h3>
                <p>
                    Cookie Cookbook is a website to share cookie recipes. 
                    Anyone can create a new recipe, update a recipe, or delete an existing recipe.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Carousel.Caption>
                <h3>Behind the Scenes</h3>
                <p>
                    Chana Bayla Katz, Daniella Shoob, and Rivka Benyowitz are senior Computer Science student in WITS.
                    Together, they created this website for their capstone project in WITS.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>

          
  
        // <>
        //     <h1>About Cookie Cookbook</h1>
        //     <p>
        //         Cookie Cookbook is a website to share cookie recipes. 
        //         Anyone can create a new recipe, update a recipe, or delete an existing recipe.
        //     </p>

        //     <h2>Behind the Scenes</h2>
        //     <p>
        //         Chana Bayla Katz, Daniella Shoob, and Rivka Benyowitz are senior Computer Science student in WITS.
        //         Together, they created this website for their capstone project in WITS.
        //     </p>

        // </>
    );
}
export default AboutPage;