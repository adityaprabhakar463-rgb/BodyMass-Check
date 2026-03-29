# BodyMass Check

A clean BMI calculator with a visual indicator bar, built with vanilla JavaScript, HTML, and CSS.

## Features
- Calculates BMI from height (cm) and weight (kg)
- Category labels — Underweight, Normal, Overweight, Obese
- Color-coded visual indicator bar showing where you fall on the BMI scale
- Input validation with clear error messages
- Last result persisted via localStorage
- Accessible — uses ARIA attributes on the indicator bar

## BMI Formula
```
BMI = weight (kg) / height (m)²
```

## Visual indicator
The indicator bar covers a BMI range of 10–40. The position of the marker is calculated as:
```
position (%) = (BMI - 10) / 30 * 100
```
Color coding: blue (underweight) → green (normal) → amber (overweight) → red (obese)

## Built with
- HTML5
- CSS3
- Vanilla JavaScript — no libraries

## What I learned
- Normalizing a value to a percentage range
- Dynamic CSS manipulation for visual feedback
- Form validation patterns
- Optional chaining (?.) for defensive coding
