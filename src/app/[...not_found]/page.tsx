"use client"
import { useEffect } from "react";

export default function({ error }: any) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="flex w-full h-[80%] items-center justify-center">
      <p>Something went wrong!</p>
    </section>
  )
}
