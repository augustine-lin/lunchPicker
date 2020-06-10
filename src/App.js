import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

import './App.css'
import {
  EuiButton, EuiFieldText, EuiSpacer, EuiFlexGrid, EuiFlexItem,
} from '@elastic/eui'

import { ReactComponent as LoadingIcon } from './assets/image/load.svg'


const config = {
  apiKey: 'AIzaSyAqQMiKQaQLWxumSivvH2siyKrq7SiM2pk',
  authDomain: 'lunchpicker-570ca.firebaseapp.com',
  databaseURL: 'https://lunchpicker-570ca.firebaseio.com',
  projectId: 'lunchpicker-570ca',
  storageBucket: 'lunchpicker-570ca.appspot.com',
  messagingSenderId: '191555540873',
  appId: '1:191555540873:web:5b36e94aef3c12a46cb358',
}

firebase.initializeApp(config)

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

function LoadingState() {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoadingIcon className="loadingIcon" />
      <div className="mt-3">Loading...</div>
    </div>
  )
}

function Layout() {
  const [currentRestaurant, setCurrentRestaurant] = useState('請選擇')
  const [restaurantInfo, setRestaurantInfo] = useState({ name: '', description: '' })
  const [restaurantList, setRestaurantList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurantList = () => {
      setIsLoading(true)
      firebase.database().ref('/restaurants').once('value').then((res) => {
        console.log(res.val())
        if (Array.isArray(res.val())) {
          setRestaurantList(res.val())
          setIsLoading(false)
        }
      })
    }
    fetchRestaurantList()
  }, [])

  const addRestaurant = () => {
    const { name, description } = restaurantInfo
    const newRestaurantList = restaurantList.concat([{ name, description }])
    firebase.database().ref('/restaurants')
      .set(newRestaurantList)
      .then(() => {
        setRestaurantList(newRestaurantList)
        setRestaurantInfo({
          name: '',
          description: '',
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const lottery = () => {
    if (restaurantList.length === 0) return
    const restaurantIndex = getRandomInt(restaurantList.length)
    const newRestaurant = restaurantList[restaurantIndex]
    if (currentRestaurant === newRestaurant.name) {
      lottery()
    } else {
      setCurrentRestaurant(newRestaurant.name)
    }
  }

  const onChange = (e, type) => {
    const newRestaurantInfo = {
      ...restaurantInfo,
      [type]: e.target.value,
    }
    setRestaurantInfo(newRestaurantInfo)
  }

  return (
    <div className="h-screen container mx-auto">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-center">
          {
            isLoading
              ? <LoadingState />
              : (
                <>
                  <div className="mb-10">{currentRestaurant}</div>
                  <EuiButton onClick={lottery}>抽獎</EuiButton>
                </>
              )
          }
        </div>
      </div>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <div>
            {
              restaurantList.map((restaurant) => (
                <div key={restaurant.name} className="mt-2">
                  {`${restaurant.name} - ${restaurant.description} `}
                </div>
              ))
            }
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <div>
            <EuiFieldText
              placeholder="餐廳名稱"
              value={restaurantInfo.name}
              onChange={(e) => onChange(e, 'name')}
              aria-label="餐廳名稱"
            />
            <EuiSpacer size="m" />
            <EuiFieldText
              placeholder="餐廳描述"
              value={restaurantInfo.description}
              onChange={(e) => onChange(e, 'description')}
              aria-label="餐廳描述"
            />
            <EuiSpacer size="m" />
            <EuiButton onClick={addRestaurant}>
              儲存
            </EuiButton>
            <EuiSpacer size="m" />
          </div>
        </EuiFlexItem>
      </EuiFlexGrid>
    </div>
  )
}

export default Layout
