import AboutFeatureItem from "./AboutFeatureItem"
import aboutFeatures from "./aboutFeatures"

const About = () => {
  return (
    <div className="px-6 pt-24 pb-16 max-w-4xl mx-auto text-center">
      <img src="./bg-2.jpg" alt="Books in Library" className="mx-auto max-w-xs sm:max-w-md"/>
      <h2 className="text-3xl font-bold mb-2 mt-4 text-dark-blue">About Library App</h2>
      <p className="text-gray-800 text-lg leading-relaxed max-w-prose mx-auto">
        Library App is a modern digital platform that gives you access to a rich collection of books.
        Our goal is to make reading easier, faster, and more accessible to everyone.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 py-12 text-gray-800">
           {aboutFeatures.map((entry, index) => (
              <AboutFeatureItem key={index} {...entry} />
            ))}
      </div>    
    </div>
      

  )
}

export default About
