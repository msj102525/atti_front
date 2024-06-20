import React, { useEffect } from "react";

export default function MapForDoctor({
  latitude,
  longitude,
  hospitalName,
  hospitalPhoto,
}) {
  const serverImage = process.env.NEXT_PUBLIC_API_URL;
  const imgUrl = `${serverImage}${hospitalPhoto}`;

  useEffect(() => {
    if (latitude && longitude) {
      if (typeof window !== "undefined") {
        const { kakao } = window;
        if (kakao && kakao.maps) {
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            disableKeyboardShortcuts: true,
          };
          const map = new kakao.maps.Map(container, options);

          const markerPosition = new kakao.maps.LatLng(latitude, longitude);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          const content = `
            <div style="
              position: absolute;
              bottom: 50px;
              left: -75px;
              background: rgba(255, 255, 255, 0.9);
              border: 1px solid #ccc;
              padding: 10px;
              border-radius: 8px;
              box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
              text-align: center;
              z-index: 2;
              width: 150px;
              pointer-events: none;
              display: flex;
              flex-direction: column;
              align-items: center;
            ">
              <img src="${imgUrl}" style="width: 100px; height: 60px; border-radius: 4px; object-fit: cover; margin-bottom: 5px;" alt="${hospitalName}" />
              <div style="font-size: 12px; font-weight: bold; color: #333;">${hospitalName}</div>
            </div>
          `;

          const overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: markerPosition,
            yAnchor: 1,
            zIndex: 2,
          });

          overlay.setContent(content);
        }
      }
    }
  }, [latitude, longitude, imgUrl, hospitalName]);

  return (
    <div
      id="map-container"
      className="border-4 border-gray-300 rounded-lg"
      style={{ width: "430px", height: "330px" }}
    >
      {latitude && longitude ? (
        <div
          id="map"
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full p-6 text-center text-gray-600 bg-gray-100">
          <p className="font-bold">아직 병원 주소가 등록되지 않았어요 !</p>
        </div>
      )}
    </div>
  );
}
