import React from "react";

export type Props = {
  children?: React.ReactNode | React.ReactNode[] | undefined | null;
}
export function TypographyH1({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function TypographyH2({ children }: Props) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}

export function TypographyH3({ children }: Props) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function TypographyH4({ children }: Props) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  )
}

export function TypographyP({ children }: Props) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </p>
  )
}

export function TypographyBlockquote({ children }: Props) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  )
}

export function TypographyMuted({ children }: Props) {
  return (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  )
}

