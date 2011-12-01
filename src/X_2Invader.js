function X_2Invader(game, x, y, path) 
{
  //enemy that looks like X^2
  //call EnemyChange, pass important parameters (needed for Enemy.call) and 'next enemy' that appears after death
  EnemyChange.call(this, game, x, y, path,
    CONST.X_2INVADER_IMAGE,
    CONST.X_2INVADER_HEALTH,
    CONST.X_2INVADER_DAMAGE,
    CONST.X_2INVADER_POINTS,

	  X2Invader
  );
}
obj.extend(X_2Invader, EnemyChange);

