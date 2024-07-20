"use client";
import {  useEffect, useState} from "react";
import {  Center, Float, Image, SpotLight, Text, Billboard } from '@react-three/drei';
import { useMouse } from '@uidotdev/usehooks'
import { Canvas, useFrame, useThree} from '@react-three/fiber';
import { DotScreen, EffectComposer, Glitch } from '@react-three/postprocessing';
import { Vector2 } from 'three';
import { BlendFunction } from 'postprocessing';
import { AsciiEffect } from './AsciiGl';
import useDeviceOrientation, { DeviceOrientation } from './useOrientation';

interface IInternalSceneProps {
  y: number;
  x: number;
  width: number;
}

const KText = (props: any) => {
  return (
    <Text {...props} font='https://fonts.gstatic.com/s/orbitron/v7/2I3-8i9hT294TE_pyjy9SaCWcynf_cDxXwCLxiixG1c.ttf'/>
  )
}

interface IHPTextProps {
  width: number;
  color?: string;
  cover?: boolean;
}

const HPText = ({width, color= "white", cover=false}: IHPTextProps) => {
  // on render, progressively bring the text in position starting with both at the centre
  // then the top one moves up and the bottom one moves down
  const [pos, setPos] = useState(0);
  useFrame(() => {
    if (pos < 1) {
      setPos(pos + 0.01);
    }
  })
  const commonProps = { color, maxWidth: width, textAlign: "center", letterSpacing: 0.2}
  return (
    <Text rotation={[0, 0, 0]} characters="abcdefgλhijklmnopqrstuvwxyz0123456789!" strokeOpacity={0.1}>
      <KText {...commonProps} fontSize={width/7.5} position={[0, (cover ? pos : 1) * 3, cover ? 0.2 : 0]}>QL1PH0TH</KText>
      <KText {...commonProps} fontSize={width/7} position={[0, (cover ? pos : 1) * -3, cover ? 0.2 : 0]}>5Y5T3M5</KText>
    </Text>
  )
}
const InternalScene = ({y, x, width}: IInternalSceneProps) => {

  const pastCentre =0.5 - y;

  return (
      <>

           <Float floatIntensity={1} floatingRange={[-1,1]} rotationIntensity={0.2}>
          <Float>
          <Text color={"white"} fontSize={width} strokeOpacity={1 - y} fillOpacity={pastCentre> 0 ? 1-y : 0} position={[0, 0, -3]} maxWidth={width} strokeWidth={0.3} strokeColor={"green"}>λ</Text>

          </Float>
          <Float enabled={true} speed={2} floatIntensity={1} floatingRange={[-1,1]} rotationIntensity={3}>

            <Image transparent url='/numogram.png' zoom={0.4} scale={width*3.5} position={[0, 0, 2]} color="#7f7" opacity={pastCentre > 0 ? 0 : 1}></Image>


          </Float>

          <ambientLight intensity={4} />
          <SpotLight position={[0, 0, 10]} intensity={10} />
          </Float>
      </>
    );

}

const Container = () => {
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);

  const {orientationChange} = useDeviceOrientation();

  // get the canvas width
  const { width, height } = useThree(state => state.viewport.getCurrentViewport())
  const [mouse] = useMouse()
  const mouseX = (mouse.x / width)/100;
  const mouseY = (mouse.y / height)/100;

  useEffect(() => {
    if (orientationChange && orientationChange.beta !== null && orientationChange.alpha !== null) {
      // Use orientationChange values if available
      setY(orientationChange.beta / 30);
      setX(0.5 + orientationChange.gamma / 30);

    } else {
      // Fallback to mouse position
      setY(mouseY);
      setX(mouseX);
    }
  }, [orientationChange, mouseX, mouseY])

    return (
      <Center  disable rotation={[0,0.5 - x, 0]} position={[0, 0, -1]} >
        <Billboard follow={false}>
          <HPText cover={true} color={"white"} width={width} />
          <HPText color={"green"}  width={width} />

        </Billboard>


          <InternalScene y={y} x={x}width={width} />
          <EffectComposer>
          {y> 0.4 && y < 0.6 ? <DotScreen blendFunction={BlendFunction.INVERT} ></DotScreen> :<AsciiEffect characters=' .,⦁↬∞∂λ⍼☿⁜ℵ'cellSize={20}/>}
          { (y > 0.45 && y < 0.55 && x > 0.45 && x < 0.55) ? <Glitch strength={new Vector2(Math.abs(y-0.5 * 2), Math.abs(y-0.5 * 2))} /> : <></>}
          </EffectComposer>

      </Center>
  )
}

const AsciiBG = () => {

  return (
    <Canvas style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
        <Container />
    </Canvas>
  )
}

export { InternalScene, AsciiBG };