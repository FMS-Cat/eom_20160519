PShader shader;
int frames;

void setup() {
  size( 256, 256, P2D );
  
  frames = 60;
  
  shader = loadShader( "shader.frag" );
  shader.set( "resolution", width * 1.0, height * 1.0 );
}

void draw() {
  shader.set( "time", ( frameCount * 1.0 / frames ) % 1.0 );
  filter( shader );
  
  //if ( frames < frameCount ) {
  // saveFrame( "out/####.png" );
  //}
  //if ( frames * 2 == frameCount ) {
  // exit();
  //}
}