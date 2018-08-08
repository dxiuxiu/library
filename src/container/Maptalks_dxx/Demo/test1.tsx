import React from 'react'
import * as maptalks from 'maptalks' 

import './test.scss'

interface IProps {
  test?: any
}
interface IState {
  test?: any
}

export default class Demo1 extends React.Component<IProps, IState> {
  map = null
  constructor(props: IProps, state: IState) {
    super(props, state)
  }

  componentDidMount() {
    this.map = new maptalks.Map('mapTest', {
    //   center: [-0.113049 , 51.498568],
    //   zoom: 14,
    //   baseLayer: new maptalks.TileLayer('base', {
    //     urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    //     subdomains: ['a' , 'b' , 'c' , 'd'],
    //     attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    //   })
    // })
      center: [-0.113049 , 51.498568],
      zoom: 14,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a' , 'b' , 'c'],
        attribution: '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
      })
    })
  }

  render() {
    const mapStyle = { width: '100%', height: '500px' }
    return(
        <div>
          <div className='mapTest' id='mapTest'/>
          {/* <div style={mapStyle} id='mapTest'/> */}
        </div>
    )
  }
}

