import React from "react"

interface FeatureProps  {
  Icon: React.ElementType
  title: String
  description: String
}

const AboutFeatureItem = ({Icon, title, description}: FeatureProps) => {
  return(
    <div className="flex flex-col items-center text-center gap-4">
      <Icon size={52} className="text-dark-blue"/>
      <h3 className="font-semibold text-lg whitespace-nowrap">{title}</h3>
      <p className="leading-relaxed max-w-xs">{description}</p>
    </div>
  )
}

export default AboutFeatureItem