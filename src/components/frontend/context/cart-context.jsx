"use client"

import { createContext, useContext, useReducer } from 'react'

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} discount
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartState
 * @property {CartItem[]} items
 * @property {number} totalQuantity
 * @property {number} totalAmount
 */

/**
 * @typedef {Object} CartAction
 * @property {'ADD_ITEM'|'REMOVE_ITEM'|'UPDATE_QUANTITY'} type
 * @property {CartItem|string|{id: string, quantity: number}} payload
 */

const CartContext = createContext()

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
}

function calculateTotals(items) {
  return {
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
    //   console.log('Adding item:', action.payload);
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      let updatedItems

      if (existingItemIndex >= 0) {
        // console.log('Updating existing item');
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // console.log('Adding new item');
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      const totals = calculateTotals(updatedItems)
    //   console.log('Updated cart state:', {
    //     items: updatedItems,
    //     totalQuantity: totals.totalQuantity,
    //     totalAmount: totals.totalAmount
    //   });

      return {
        ...state,
        items: updatedItems,
        totalQuantity: totals.totalQuantity,
        totalAmount: totals.totalAmount
      }
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0

      const totals = calculateTotals(updatedItems)
      return {
        ...state,
        items: updatedItems,
        totalQuantity: totals.totalQuantity,
        totalAmount: totals.totalAmount
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      const totals = calculateTotals(updatedItems)
      return {
        ...state,
        items: updatedItems,
        totalQuantity: totals.totalQuantity,
        totalAmount: totals.totalAmount
      }
    }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

