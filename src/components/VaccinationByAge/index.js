import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props

  return (
    <div className="rechart-container">
      <h1 className="rechart-heading">Vaccination by Age</h1>
      <ResponsiveContainer
        width="100%"
        height={300}
        className="responsive-container"
      >
        <PieChart>
          <Pie
            cx="50%"
            cy="30%"
            data={vaccinationByAgeData}
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#fecba6" />
            <Cell name="45-60" fill="#b3d23f" />
            <Cell name="Above 60" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
