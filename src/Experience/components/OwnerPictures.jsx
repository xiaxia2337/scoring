import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// 配置参数
const CYLINDER_RADIUS = 11; // 圆柱体半径（更靠内）
const PHOTO_WIDTH = 5; // 照片宽度
const PHOTO_HEIGHT = 4; // 照片高度
const PHOTO_POS_Y = 5; // 照片在y轴的位置（四季版块中间）

// 图片文件名列表
const imageFileNames = [
  "成都之行25.8.13.jpg",
  "济南之行24.8.11.jpg",
  "青岛之行24.10.1.jpg",
  "青岛之行24.9.30.jpg",
];

// 从完整路径中提取不带路径和扩展名的文件名
const getDisplayName = (path) => {
  // 先获取路径中的文件名部分
  const fileName = path.split("/").pop();
  // 再移除扩展名
  return fileName.replace(/\.[^/.]+$/, "");
};

// 单个照片组件
const PhotoPlane = ({ imagePath, angle }) => {
  const texture = useLoader(TextureLoader, imagePath);

  // 设置纹理参数
  texture.colorSpace = THREE.SRGBColorSpace;

  // 计算照片在圆柱内壁上的位置
  const x = Math.sin(angle) * CYLINDER_RADIUS;
  const z = Math.cos(angle) * CYLINDER_RADIUS;

  // 获取文件名（不带扩展名）
  const displayName = getDisplayName(imagePath);

  return (
    <group position={[x, PHOTO_POS_Y, z]} rotation={[0, angle + Math.PI, 0]}>
      {/* 照片平面 */}
      <mesh>
        <planeGeometry args={[PHOTO_WIDTH, PHOTO_HEIGHT]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 文件名文字（使用 HTML 叠加层） */}
      <Html
        position={[0, -PHOTO_HEIGHT / 2 - 1.2, 0.01]}
        center
        style={{
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "bold",
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.9)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {displayName}
      </Html>
    </group>
  );
};

// 主组件 - 覆盖圆柱体内壁
const OwnerPictures = () => {
  // 生成图片路径和角度（正好位于四季版块的中心）
  const photosWithAngles = useMemo(() => {
    if (imageFileNames.length === 0) return [];

    // 每张照片正好位于四季版块的中心
    const startAngle = Math.PI / 4; // 从45度开始，这样第一张在冬季版块中心
    const angleStep = (Math.PI * 2) / imageFileNames.length;

    return imageFileNames.map((fileName, index) => ({
      fileName,
      imagePath: `/owner-picture/${fileName}`,
      angle: startAngle + index * angleStep,
    }));
  }, []);

  if (photosWithAngles.length === 0) return null;

  return (
    <group>
      {photosWithAngles.map((photo) => (
        <PhotoPlane
          key={photo.fileName}
          imagePath={photo.imagePath}
          angle={photo.angle}
        />
      ))}
    </group>
  );
};

export default OwnerPictures;
