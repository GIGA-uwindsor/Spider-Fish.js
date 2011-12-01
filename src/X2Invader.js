function X2Invader(game, x, y, path) 
{
  //enemy that looks like 2X
  //call EnemyChange, pass important parameters (needed for Enemy.call) and 'next enemy' that appears after death
  EnemyChange.call(this, game, x, y, path,
    CONST.X2INVADER_IMAGE,
    CONST.X2INVADER_HEALTH,
    CONST.X2INVADER_DAMAGE,
    CONST.X2INVADER_POINTS,
	  L2Invader
  );
}
obj.extend(X2Invader, EnemyChange);
