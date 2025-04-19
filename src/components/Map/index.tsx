import mapboxgl from 'mapbox-gl';
import clsx from 'clsx';
import { useEffect, useState, useMemo, useRef } from 'react';
import { LocationData, MapProps, NormalizedLocation } from '@lib/types';
import { Tooltip , ButtonGroup } from '@mui/material';
import { PanTool, CancelPresentation, ZoomIn, ZoomOut, Mouse } from '@mui/icons-material';
import { StyledButton } from './constants';

const Map: React.FC<MapProps> = ({ 
  data = [],
  withControls = true,
  dragPan = false,
  scrollZoom = false,
  className = '',
 }) => {
  const [toggleDrag, setToggleDrag] = useState<boolean>(dragPan);
  const [toggleScroll, setToggleScroll] = useState<boolean>(scrollZoom);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const normalizeLocations = (data: LocationData | LocationData[]): NormalizedLocation[] => {
    // If the data is an array, map over it
    if (Array.isArray(data)) {
      return data.map(({ formatted, location }) => ({
        lat: location.latitude,
        lng: location.longitude,
        title: formatted
      }));
    }
  
    // If the data is a single object, convert it into an array with one entry
    if (typeof data === "object" && data !== null) {
      return [{
        lat: data.location.latitude,
        lng: data.location.longitude,
        title: data.formatted
      }];
    }
  
    // If data is neither an array nor an object, return an empty array
    return [];
  };

  const buttons = useMemo(() => [
    <Tooltip key='drag' title={`${!toggleDrag ? 'Enable Panning?' : 'Disable Panning?'}`} placement='right-start'>
      <StyledButton
        className='p-1'
        onClick={() => setToggleDrag((prev) => !prev)}
      >
        {!toggleDrag ? <PanTool fontSize='small' /> : <CancelPresentation fontSize='small' />}
      </StyledButton>
    </Tooltip>,
    <Tooltip key='scrollzoom' title={`${!toggleScroll ? 'Enable Scroll Zoom?' : 'Disable ScrollZoom?'}`} placement='right-start'>
      <span className={`${toggleDrag ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
        <StyledButton
          className={`p-1 ${toggleDrag ? 'pointer-events-auto opacity-100z' : 'pointer-events-none opacity-40'}`}
          onClick={() => setToggleScroll((prev) => !prev)}
        >
          {!toggleScroll ? <Mouse fontSize='small' /> : <CancelPresentation fontSize='small' />}
        </StyledButton>
      </span>
    </Tooltip>,
    <Tooltip key='zoomin' title='Zoom In' placement='right-start'>
      <StyledButton
        className='p-1'
        onClick={() => map.current?.zoomIn()}
      >
        <ZoomIn />
      </StyledButton>
    </Tooltip>,
    <Tooltip key='zoomout' title='Zoom Out' placement='right-start'>
      <StyledButton
        className='p-1'
        onClick={() => map.current?.zoomOut()}
      >
        <ZoomOut />
      </StyledButton>
    </Tooltip>,
  ], [toggleDrag, toggleScroll]); ;

  useEffect(() => {
    if (!mapContainer.current) return;
    if (data.length <= 0) return;
 
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX || '';
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [normalizeLocations(data)[0].lng, normalizeLocations(data)[0].lat],
      zoom: 9,
      scrollZoom,
      dragPan,
      attributionControl: false,
      projection: { name: 'mercator' },
    });

    map.current.on('load', () => {
      normalizeLocations(data).forEach(({ lat, lng, title }) => {
        // Create the marker with default blue color
        const marker = new mapboxgl.Marker({
          color: "#0055ff",
          scale: 0.8
        })
          .setLngLat([lng, lat])
          .addTo(map.current!);
        
        // Get the marker element
        const markerElement = marker.getElement();
        
        // Create a variable in closure to store the gray marker
        let hoverMarker: any | null = null;
        
        // Add event listeners for hover effect
        markerElement.addEventListener('mouseenter', () => {
          // Remove the current marker
          marker.remove();
          
          // Create a new marker with gray color at the same position
          hoverMarker = new mapboxgl.Marker({
            color: "gray",
            scale: 0.8
          })
            .setLngLat([lng, lat])
            .addTo(map.current!);
          
          // Get the gray marker element
          const hoverMarkerElement = hoverMarker.getElement();
          
          // Add event listener to revert back on mouse leave
          hoverMarkerElement.addEventListener('mouseleave', () => {
            if (hoverMarker) {
              hoverMarker.remove();
              hoverMarker = null;
              marker.addTo(map.current!);
            }
          });
          
          // Transfer the popup if it exists
          if (marker.getPopup()) {
            hoverMarker.setPopup(marker.getPopup());
          }
        });
          
        // Optional: Add a popup with the location title  
        const popup = new mapboxgl.Popup({ 
          offset: 25,
         })
          .setHTML(`<p>${title}</p>`);
    
        marker.setPopup(popup);
      });
    });

    map.current.addControl(new mapboxgl.AttributionControl({ compact: false }));

    return () => {
      map.current?.remove();
    };
  }, [data]);

  useEffect(() => {
    if (!map.current?.dragPan) return;
  
    toggleDrag ? map.current.dragPan.enable() : map.current.dragPan.disable();
  }, [toggleDrag]);

  useEffect(() => {
    if (!map.current?.scrollZoom) return;
    console.log(toggleScroll)
    toggleScroll ? map.current.scrollZoom.enable() : map.current.scrollZoom.disable();
  }, [toggleScroll]);

  return (
    <div className={clsx('relative map-parent h-full w-full min-h-48 overflow-hidden', className)}>
      {!toggleDrag && <div className='absolute top 0 w-full h-full z-10 bg-black/50 cursor-not-allowed'/>}
      <div ref={mapContainer} className='h-full w-full'/>
      <div className='absolute top-4 left-4 z-10 w-auto h-auto bg-white rounded'>
        <ButtonGroup 
          orientation='vertical' 
          aria-label='vertical map control buttons'
        >
          {buttons}
        </ButtonGroup>
      </div>
    </div>
  )
};

export default Map;