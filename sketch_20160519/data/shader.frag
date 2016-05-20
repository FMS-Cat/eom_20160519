#define PI 3.14159265
#define V vec2(0.,1.)

precision highp float;

uniform float time;
uniform vec2 resolution;

void main() {
  float v = time + resolution.x;
  v += gl_FragCoord.x * 66.6;
  v = mod( v, 1.0 );

  float phase = time;

  vec2 uv = gl_FragCoord.xy / resolution;
  gl_FragColor.xy = mod( gl_FragColor.xy + phase + uv, 1.0 );

  vec3 temp = gl_FragColor.xyz;

  float len = length( uv - vec2( 0.5 ) );
  if ( len < 0.2 || ( 0.25 < len && len < 0.3 ) ) {
    gl_FragColor = V.yxyy;
    gl_FragColor.xyz -= temp;
    gl_FragColor.xyz = ( gl_FragColor.x + gl_FragColor.y + gl_FragColor.z ) * uv.y * V.yyy;
    gl_FragColor.xyz += vec3( 0.14, 0.22, 0.34 );
  }

  vec2 cell = floor( uv * 16.0 ) / 16.0;
  uv += cell * gl_FragColor.y;

  if ( 2.0 < uv.x + uv.y ) {
    gl_FragColor.xyz -= mod( gl_FragColor.x * gl_FragColor.z, 2.0 ) * V.yyy;
  }

  if ( resolution.y - 2.0 < gl_FragCoord.y ) {
    gl_FragColor.z += gl_FragColor.x + gl_FragColor.y;
  }
}
