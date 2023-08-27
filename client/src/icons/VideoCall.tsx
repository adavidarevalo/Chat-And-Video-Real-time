function VideoCallIcon({ className }: { className: string }) {
  return (
    <div data-testid="video-call-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        viewBox="0 0 24 24"
      >
        <path d="M23 7L16 12 23 17 23 7z"></path>
        <rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect>
      </svg>
    </div>
  );
}

export default VideoCallIcon;
