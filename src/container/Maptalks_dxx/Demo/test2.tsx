import React from 'react'
import * as maptalks from 'maptalks' 

import './test.scss'
// import { resolve } from 'url'

interface IProps {
  test?: any
}
interface IState {
  test?: any
}

export default class Demo2 extends React.Component<IProps, IState> {
  map : any   
  mapContainer: HTMLDivElement| null                 
  toolbar : {}
  pitch = 0
  d = 'up'
  bearing = 0
  paused = false

  
  constructor(props: IProps, state: IState) {
    super(props, state)
  }

  componentDidMount() {
    // this.map = this.createMap('mapTest')
     this.createMap(this.mapContainer).then((map) => {
      this.map = map           // 
    }, (err) => {
      console.log(err)
    }).then(() => {
      // 需要在map对象创建结束之后做的操作
      // console.log(this.map)
      this.creacteToolbar(this.map).then((info) => {
        console.log(info)
      }).catch((info) => {
        console.log(info)
      })
      this.addMarkers(this.map)
      this.changeView()
      this.map.on('moveend',  () => {
        const view = this.map.getView()
        console.log(view)
      })
    })
    
  }

  /**
   * 创建map对象
   */
  createMap = (mapContainer: HTMLDivElement| null) => {
    return new Promise((resolve, reject) => {
      if (mapContainer) {
        resolve(new maptalks.Map(mapContainer, {
          center: [-0.113049 , 51.498568],
          zoom: 14,
          pitch : 45,
          attribution: true,   // 默认为true,是否展示左下角的类似版权信息的内容
          // 添加缩放工具
          zoomControl : true, // 默认为false
          // 添加比例尺工具
          scaleControl : true, // 默认为false
          // 添加鹰眼
          overviewControl : true, // 默认为false
          // 允许地图拖拽倾斜（ctrl+按下鼠标右键或左键）, 默认为true
          dragPitch : true,
          // 允许地图拖拽旋转（ctrl+按下鼠标右键或左键）, 默认为true
          dragRotate : true,
          // 同时启用地图拖动倾斜和旋转，默认为false   ???
          dragRotatePitch : false,
          baseLayer: new maptalks.TileLayer('base', {
            urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            subdomains: ['a' , 'b' , 'c'],
            attribution: '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
          }),
          layers: [
            new maptalks.VectorLayer('v')
          ]
        }))
      } else {
        reject('Invalid map container div')
      }
    })
  }

  /**
   * 改变视角
   */
  changeView = () => {
    if (this.pitch > 50) {
      this.d = 'down'
    } else if (this.pitch < 0) {
      this.d = 'up'
    }
    if (this.d === 'down') {
      this.pitch--
    } else {
      this.pitch++
    }
    this.map.setPitch(this.pitch)              // 给地图设置一个新的 pitch
    this.map.setBearing(this.bearing++)        // 给地图设置一个新的 bearing
    if (!this.paused) {
      requestAnimationFrame(this.changeView)   // web API,用于更新屏幕画面
    }
  }
  /**
   * 重置
   */
  reset = (map) => {
    requestAnimationFrame( () => {
      this.paused = true
      this.pitch = 0
      this.bearing = 0
      map.setPitch(0)
      map.setBearing(0)
      console.log(map)
    })
  }
  /**
   * 添加marker
   */
  addMarkers = (map) => {
    const center = map.getCenter()  //  获取地理中心
    // console.log(center)
    // new Marker(coordinates, options)
    const m1 = new maptalks.Marker(center.add(-0.008, -0.008))
    const m2 = new maptalks.Marker(center.add(0.008, -0.008))
    const m3 = new maptalks.Marker(center.add(-0.008, 0.008))
    const m4 = new maptalks.Marker(center.add(0.008, 0.008))

    map.getLayer('v').addGeometry(m1, m2, m3, m4)
  }
  /**
   * 创建工具条
   */
  creacteToolbar = (map) => {
    return new Promise((resolve , reject) => {
      this.toolbar = new maptalks.control.Toolbar({
        items: [
          {
            'item' : '停止',
            'click' :  () => {
              this.paused = true
            }
          },
          {
            'item' : '开始',
            'click' :  () => {
              this.paused = false
              // this.changeView(map)
              this.changeView()
            }
          },
          {
            'item' : '重置',
            'click' :  () => {
              this.reset(map)
            }
          }
        ]
      }).addTo(map)

      if (this.toolbar) {
        resolve(true)
      } else {
        reject(false)
      } 
    })
  }

  

  render() {
    return(
        <div>
          <div ref={node => this.mapContainer = node} className='mapTest' />
        </div>
    )
  }


}

